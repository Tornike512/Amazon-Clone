import { useEffect, useContext, useState } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { useNavigate } from "react-router-dom";

import cartDeleteRequest from "@src/utils/CartDeleteRequest";

import { TCartProducts } from "@src/@types/RequestTypes";

import axios from "axios";

import "./CartPage.scss";

export function CartPage() {
  const [cartProducts, setCartProducts] = useState<TCartProducts[]>([]);
  const [saveForLater, setSaveForLater] = useState<boolean>(false);
  const [selectSavedProduct, setSelectSavedProduct] = useState<string[]>([]);
  const [productId, setProductId] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [subtraction, setSubtraction] = useState<number>(() => {
    const storedSubtraction = localStorage.getItem("subtraction");
    return storedSubtraction ? JSON.parse(storedSubtraction) : 0;
  });

  const {
    countCartProducts,
    setCountCartProducts,
    subtotal,
    setSubtotal,
    countProducts,
    setCountProducts,
    purchasedItem,
  } = useContext(GlobalContext);

  async function getCartProducts() {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartProducts(response.data);
      setLoading(false);
      const subTotal = response.data.reduce(
        (total: number, item: any) =>
          total + (item.cartProduct.salePrice * item.count ?? 0),
        0
      );
      setSubtotal(subTotal);

      setCountProducts(Object.keys(response.data).length);
    } catch (error) {
      console.log("Error Requesting Cart Products", error);
    } finally {
    }
  }

  const token = localStorage.getItem("access_token");

  const storedPurchasedItem = JSON.parse(
    localStorage.getItem("purchased item") || "0"
  );

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(
      "header cart count",
      JSON.stringify(countCartProducts)
    );
  }, [countCartProducts]);

  setCountCartProducts(countProducts - selectSavedProduct.length);

  useEffect(() => {
    localStorage.setItem("subtraction", JSON.stringify(subtraction));
  }, [subtraction]);

  const storedTotalPrice = JSON.parse(
    localStorage.getItem("total price") || "{}"
  );

  useEffect(() => {
    getCartProducts();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem(
        "saved products",
        JSON.stringify(selectSavedProduct)
      );
    }, 1000);
  }, [selectSavedProduct]);

  useEffect(() => {
    const savedProducts = JSON.parse(
      localStorage.getItem("saved products") || "[]"
    );
    setSelectSavedProduct(savedProducts);
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

  useEffect(() => {
    const totalPrice = subtotal - -1 * subtraction;
    localStorage.setItem("total price", JSON.stringify(totalPrice));
  }, [storedTotalPrice, subtraction, subtotal]);

  useEffect(() => {
    localStorage.setItem("purchased item", JSON.stringify(purchasedItem));
  }, [purchasedItem]);

  const filterPurchasedItems = cartProducts.filter((item) => {
    return !storedPurchasedItem
      .map((stored: any) => stored.id)
      .includes(item.cartProduct.id);
  });

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div className="cart-page-split">
      <div className="cart-page">
        <div className="cart">
          <div className="shopping-cart">
            <h1>Shopping Cart</h1>
            <span className="price-text">Price</span>
            <>
              {cartProducts.map((item) => {
                return (
                  productId[productId.length - 1] === item.cartProduct.id && (
                    <div key={item.id} className="saved-product">
                      <a
                        onClick={() =>
                          navigate(`/products/${item.cartProduct.id}`)
                        }
                        className="saved-product-title"
                      >
                        {item.cartProduct.title}
                      </a>
                      <span> has been moved to Saved for Later.</span>
                    </div>
                  )
                );
              })}
            </>
            {filterPurchasedItems?.map((item) => {
              return !selectSavedProduct.includes(item.id) ? (
                <div key={item.cartProduct.id} className="cart-product">
                  <span
                    onClick={() => navigate(`/products/${item.cartProduct.id}`)}
                    className="cart-product-image"
                  >
                    <img src={item.cartProduct.image} alt="Product-image" />
                  </span>
                  <div className="cart-product-info">
                    <p
                      onClick={() =>
                        navigate(`/products/${item.cartProduct.id}`)
                      }
                      className="cart-product-title"
                    >
                      {item.cartProduct.title}
                    </p>
                    <span className="in-stock-text">In Stock</span>
                    <span className="cart-quantity">
                      <span className="product-quantity">
                        Quantity: {item.count}
                      </span>
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
                        onClick={() => {
                          setSelectSavedProduct((prev) => [...prev, item.id]);
                          setProductId((prev) => [
                            ...prev,
                            item.cartProduct.id,
                          ]);
                          if (selectSavedProduct.includes(item.id)) {
                            setSaveForLater(true);
                          }
                          setSubtraction(
                            (prevSubtraction) =>
                              prevSubtraction -
                              item.cartProduct.salePrice * item.count
                          );
                        }}
                        className="save-for-later"
                      >
                        Save for later
                      </span>
                    </span>
                  </div>
                  <span className="cart-product-price">{`$${
                    item.cartProduct.salePrice * item.count
                  }.99`}</span>
                </div>
              ) : (
                <></>
              );
            })}
            <span className="cart-product-subtotal">
              Subtotal (
              {countProducts -
                selectSavedProduct.length -
                Object.keys(storedPurchasedItem).length}{" "}
              {countProducts -
              selectSavedProduct.length -
              Object.keys(storedPurchasedItem).length ? (
                <>items</>
              ) : (
                <>item</>
              )}
              ):
              <h5>{`$${storedTotalPrice}${
                countProducts - selectSavedProduct.length === 0 ? ".00" : ".99"
              }`}</h5>
            </span>
          </div>
        </div>

        <div className="save-for-later-list">
          <h2>Your items</h2>
          <span className="saved-items">No items saved for later</span>
          <div className="saved-for-later-grid">
            {cartProducts.map((item) => {
              return selectSavedProduct.includes(item.id) ? (
                <div
                  key={item.cartProduct.id}
                  className="saved-for-later-product"
                >
                  <div
                    onClick={() => navigate(`/products/${item.cartProduct.id}`)}
                    className="saved-for-later-image"
                  >
                    <img
                      src={item.cartProduct.image}
                      alt="Saved For Later Image"
                    />
                  </div>
                  <p
                    onClick={() => navigate(`/products/${item.cartProduct.id}`)}
                    className="saved-for-later-title"
                  >
                    Lenovo IdeaPad 1 – AMD Ryzen5-5500U – 15.6 Full HD
                    (1920x1080) – 8GB Memory – 512GB SSD Storage – Windows 11 -
                    Cloud Grey – (2023 Model)
                  </p>
                  <h5 className="saved-for-later-price">{`$${item.cartProduct.salePrice}.99`}</h5>
                  <div className="in-stock">In Stock</div>
                  <button
                    onClick={() => {
                      setSaveForLater(true);

                      if (selectSavedProduct.includes(item.id)) {
                        setSelectSavedProduct((prev) =>
                          prev.filter((productId) => productId !== item.id)
                        );
                      }
                      setSubtraction(
                        (prevSubtraction) =>
                          prevSubtraction +
                          item.cartProduct.salePrice * item.count
                      );
                    }}
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
              ) : null;
            })}
          </div>
        </div>
      </div>

      <div className="subtotal">
        <span className="subtotal-price">
          Subtotal (
          {countProducts -
            selectSavedProduct.length -
            Object.keys(storedPurchasedItem).length}{" "}
          {countProducts -
            selectSavedProduct.length -
            Object.keys(storedPurchasedItem).length >
          1 ? (
            <>items</>
          ) : (
            <>item</>
          )}
          ):{" "}
          <h3>{`$${storedTotalPrice}${
            countProducts - selectSavedProduct.length === 0 ? ".00" : ".99"
          }`}</h3>
        </span>
        <button
          disabled={
            countCartProducts - Object.keys(storedPurchasedItem).length === 0
              ? true
              : false
          }
          onClick={() => {
            navigate("/purchase");
          }}
          className="checkout"
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}
