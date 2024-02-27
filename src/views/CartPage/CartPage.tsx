import { useEffect, useContext, useState } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { ACCESS_TOKEN } from "@src/config/LocalStorageKeys";

import { TCartProducts } from "@src/@types/RequestTypes";

import axios from "axios";

import "./CartPage.scss";
console.log(ACCESS_TOKEN, "accesstoken");

export function CartPage() {
  const [cartProducts, setCartProducts] = useState<TCartProducts[]>([]);

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

      setCartProducts(response.data);
    } catch (error) {
      console.log("Error Requesting Cart Products", error);
    }
  }

  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <div className="cart-page-split">
      <div className="cart-page">
        <div className="cart">
          <div className="shopping-cart">
            <h1>Shopping Cart</h1>
            <span className="price-text">Price</span>
            {cartProducts?.map((item) => {
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
                      <span className="delete-cart-product">Delete</span>
                      <span className="save-for-later">Save for later</span>
                    </span>
                  </div>
                  <span className="cart-product-price">{`$${item.cartProduct.salePrice}.99`}</span>
                </div>
              );
            })}
            <span className="cart-product-subtotal">
              Subtotal (1 item): <h5>$21.99</h5>
            </span>
          </div>
        </div>
        <div className="save-for-later-list">
          <h2>Your items</h2>
          <span className="saved-items">No items saved for later</span>
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
      </div>
      <div className="subtotal">
        <span className="subtotal-price">
          Subtotal (1 item): <h3>$21.99</h3>
        </span>
        <button className="checkout">Proceed to checkout</button>
      </div>
    </div>
  );
}
