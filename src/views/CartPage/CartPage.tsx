import { useEffect, useContext, useState } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { ACCESS_TOKEN } from "@src/config/LocalStorageKeys";

import { TGetProducts } from "@src/@types/RequestTypes";

import axios from "axios";

import "./CartPage.scss";
console.log(ACCESS_TOKEN, "accesstoken");

export function CartPage() {
  const [cartProducts, setCartProducts] = useState<TGetProducts[]>([]);

  const { productId } = useContext(GlobalContext);
  console.log(cartProducts);
  const token = localStorage.getItem("access_token");

  async function getCartProducts() {
    try {
      if (!token) {
        throw new Error("Access token not found in localStorage");
      }

      const response = await axios.get("http://localhost:3000/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data, "es aris");

      setCartProducts(response.data);
    } catch (error) {
      console.log("Error Requesting Cart Products", error);
    }
  }

  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <div className="cart-page">
      {cartProducts?.map((item) => {
        return (
          <>
            <div className="cart">
              <div className="shopping-cart">
                <h1>Shopping Cart</h1>
                <span className="price-text">Price</span>
                <div className="cart-product">
                  <img src={item.cartProduct.image} alt="Product-image" />
                  <div className="cart-product-info">
                    <p className="cart-product-title"></p>
                    <span>In Stock</span>
                    <span className="cart-quantity">
                      <select name="" id="">
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
                        <option value="">5</option>
                      </select>
                      <span>Delete</span>
                      <span>Save for later</span>
                    </span>
                  </div>
                  <span className="cart-product-price">{`$${item.cartProduct.price}.99`}</span>
                </div>
                <span className="cart-product-subtotal">
                  Subtotal 1 item $21.99
                </span>
              </div>
              <div className="subtotal">
                <span className="subtotal-price">subtotal 1 item $21.99</span>
                <button className="checkout">Proceed to checkout</button>
              </div>
            </div>
            <div className="save-for-later">
              <h2>Your items</h2>
              <span>No items saved for later</span>
              <div className="saved-for-later-product">
                <img src="" alt="Saved For Later Image" />
                <p className="saved-for-later-title"></p>
                <span>$21.99</span>
                <span>In Stock</span>
                <button className="move-to-cart">Move to cart</button>
                <span>Delete</span>
                <span>Add to list</span>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
