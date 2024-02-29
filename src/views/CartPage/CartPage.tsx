import { useEffect, useContext, useState } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";
import cartDeleteRequest from "@src/utils/CartDeleteRequest";

import { TCartProducts } from "@src/@types/RequestTypes";

import axios from "axios";

import "./CartPage.scss";

export function CartPage() {
  const [cartProducts, setCartProducts] = useState<TCartProducts[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [countProducts, setCountProducts] = useState<number>(0);
  const [saveForLater, setSaveForLater] = useState<boolean>(false);

  const token = localStorage.getItem("access_token");

  async function getCartProducts() {
    try {
      const response = await axios.get("http://localhost:3000/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartProducts(response.data);

      const subTotal = response.data.reduce(
        (total: number, item: any) => total + item.cartProduct.salePrice,
        0
      );
      setSubtotal(subTotal);

      setCountProducts(Object.keys(response.data).length);
    } catch (error) {
      console.log("Error Requesting Cart Products", error);
    } finally {
    }
  }

  useEffect(() => {
    getCartProducts();
  }, []);

  async function deleteCartProduct(cartProductId: string) {
    try {
      cartDeleteRequest({ cartProductId, token });
      getCartProducts();
    } catch (error) {
      console.log("Couldn't Remove The Product", error);
    } finally {
    }
  }

  return (
    <div className="cart-page-split">
      <div className="cart-page">
        <div className="cart">
          <div className="shopping-cart">
            <h1>Shopping Cart</h1>
            <span className="price-text">Price</span>
            {!saveForLater &&
              cartProducts?.map((item) => {
                return (
                  <div key={item.cartProduct.id} className="cart-product">
                    <span className="cart-product-image">
                      <img src={item.cartProduct.image} alt="Product-image" />
                    </span>
                    <div className="cart-product-info">
                      <p className="cart-product-title">
                        {item.cartProduct.title}
                      </p>
                      <span className="in-stock-text">In Stock</span>
                      <span className="cart-quantity">
                        <select
                          className="select-quantity"
                          name="quantity"
                          id="quantity"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        <span
                          onClick={() => {
                            deleteCartProduct(item.id);
                            setTimeout(() => {
                              window.location.reload();
                            }, 1000);
                          }}
                          className="delete-cart-product"
                        >
                          Delete
                        </span>
                        <span
                          onClick={() => setSaveForLater(true)}
                          className="save-for-later"
                        >
                          Save for later
                        </span>
                      </span>
                    </div>
                    <span className="cart-product-price">{`$${item.cartProduct.salePrice}.99`}</span>
                  </div>
                );
              })}
            <span className="cart-product-subtotal">
              Subtotal ({countProducts}{" "}
              {countProducts > 1 ? <>items</> : <>item</>}):
              <h5>{`$${subtotal}.99`}</h5>
            </span>
          </div>
        </div>

        <div className="save-for-later-list">
          <h2>Your items</h2>
          <span className="saved-items">No items saved for later</span>
          <div className="saved-for-later-grid">
            {cartProducts.map((item) => {
              return (
                <div className="saved-for-later-product">
                  <div className="saved-for-later-image">
                    <img
                      src={item.cartProduct.image}
                      alt="Saved For Later Image"
                    />
                  </div>
                  <p className="saved-for-later-title">
                    Lenovo IdeaPad 1 – AMD Ryzen5-5500U – 15.6 Full HD
                    (1920x1080) – 8GB Memory – 512GB SSD Storage – Windows 11 -
                    Cloud Grey – (2023 Model)
                  </p>
                  <h5 className="saved-for-later-price">{`$${item.cartProduct.salePrice}.99`}</h5>
                  <div className="in-stock">In Stock</div>
                  <button
                    onClick={() => setSaveForLater(true)}
                    className="move-to-cart"
                  >
                    Move to cart
                  </button>
                  <p
                    onClick={() => {
                      deleteCartProduct(item.id);
                      setTimeout(() => {
                        window.location.reload();
                      }, 1000);
                    }}
                    className="saved-for-later-delete"
                  >
                    Delete
                  </p>
                  <p className="saved-for-later-list">Add to list</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="subtotal">
        <span className="subtotal-price">
          Subtotal ({countProducts} {countProducts > 1 ? <>items</> : <>item</>}
          ): <h3>{`$${subtotal}.99`}</h3>
        </span>
        <button className="checkout">Proceed to checkout</button>
      </div>
    </div>
  );
}
