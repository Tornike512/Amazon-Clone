import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { usePurchaseProducts } from "@src/hooks/usePurchaseProducts";

import searchIcon from "@src/assets/search-icon.png";
import successIcon from "@src/assets/success-icon.png";

import "@src/views/OrderPage/OrderPage.scss";

interface TOrderInfo {
  id: string;
  name: string;
}

export function OrderPage() {
  const { currentInfo, setCurrentInfo, successfulPurchase } =
    useContext(GlobalContext);

  const [select, setSelect] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  console.log(search);

  const orderInfos: TOrderInfo[] = [
    { id: "orders-id", name: "Orders" },
    { id: "buy-again-id", name: "Buy Again" },
    { id: "not-yet-shipped-id", name: "Not Yet Shipped" },
    { id: "digital-orders-id", name: "Digital Orders" },
    { id: "local-store-orders-id", name: "Local Store Orders" },
    { id: "cancelled-orders-id", name: "Cancelled Orders" },
  ];

  useEffect(() => {
    setCurrentInfo("Orders");
    setSelect("last 30 days");
  }, []);

  const { purchaseProducts } = usePurchaseProducts();

  const navigate = useNavigate();

  const storePurchasedItems = JSON.parse(
    localStorage.getItem("purchased item") || "{}"
  );

  const searchProducts = purchaseProducts?.filter((products) => {
    const lowerSearch = search.trim().toLowerCase();
    const lowerProduct = products.cartProduct.title.trim().toLowerCase();

    return lowerProduct.includes(lowerSearch);
  });

  return (
    <div className="orders">
      <nav className="orders-nav">
        <a href="#" className="your-account">
          Your Account
        </a>
        <span>›</span>
        <a href="#" className="your-orders">
          Your Orders
        </a>
      </nav>
      <div className="search-orders">
        <h1>Your Orders</h1>
        <div>
          <span className="order-search-spacing">
            <img src={searchIcon} alt="Search Icon" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="order-search-bar"
              type="text"
              placeholder="Search all orders"
            />
          </span>
          <button
            onClick={(e) => {
              setSearch(searchInput);
              setSearchInput("");
            }}
            className="order-search-button"
          >
            Search Orders
          </button>
        </div>
      </div>
      <ul className="order-infos">
        {orderInfos.map((orderInfo) => {
          return (
            <li
              onClick={() => setCurrentInfo(orderInfo.name)}
              key={orderInfo.id}
              className={
                currentInfo === orderInfo.name
                  ? `order-infos-list ${orderInfo.id}`
                  : "order-infos-list"
              }
            >
              {orderInfo.name}
            </li>
          );
        })}
      </ul>
      <div className="divider"></div>
      {currentInfo === "Orders" && (
        <>
          <div className="order-history">
            <label>
              <span>
                {Object.keys(storePurchasedItems).length}{" "}
                {Object.keys(storePurchasedItems).length.toString() === "1"
                  ? "Order"
                  : "Orders"}
              </span>{" "}
              placed in 2024
            </label>
          </div>
          <div
            style={{
              alignItems:
                Object.keys(purchaseProducts).length === 0 ? `center` : "",
            }}
            className="past-orders"
          >
            {select !== "2021" ? (
              <>
                {successfulPurchase ? (
                  <>
                    <div className="successful-order">
                      <span className="successful-order-text">
                        <img src={successIcon} alt="Success Icon" />
                        <h2>Your product has been successfully ordered</h2>
                      </span>
                      <p>
                        Thank you for shopping with Amazon! Your recent order
                        has been successfully placed.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {Object.keys(purchaseProducts).length === 0 && (
                      <>You have not placed any orders in {`${select}.`}</>
                    )}
                  </>
                )}
                <>
                  {searchProducts.map((purchase) => {
                    return (
                      <div
                        key={purchase.cartProduct.id}
                        className="purchased-item"
                      >
                        <div className="purchased-item-image">
                          <img
                            src={purchase.cartProduct.image}
                            alt="Purchased item"
                          />
                        </div>
                        <div className="purchased-item-title">
                          <p>{purchase.cartProduct.title}</p>
                          <button
                            onClick={() =>
                              navigate(`/products/${purchase.cartProduct.id}`)
                            }
                            className="view-your-item"
                          >
                            View your item
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </>
              </>
            ) : (
              <p
                style={{ display: "flex", justifyContent: "center" }}
                className="past-orders"
              >
                You have not placed any orders in 2021.
              </p>
            )}
          </div>
        </>
      )}
      {currentInfo === "Buy Again" && (
        <p className="buy-again">
          There are no recommended items for you to buy again at this time.
          Check Your Orders for items you previously purchased.
        </p>
      )}
      {currentInfo === "Not Yet Shipped" && (
        <>
          {searchProducts.map((purchase) => {
            return (
              <div key={purchase.cartProduct.id} className="purchased-item">
                <div className="purchased-item-image">
                  <img src={purchase.cartProduct.image} alt="Purchased item" />
                </div>
                <div className="purchased-item-title">
                  <p>{purchase.cartProduct.title}</p>
                  <button
                    onClick={() =>
                      navigate(`/products/${purchase.cartProduct.id}`)
                    }
                    className="view-your-item"
                  >
                    View your item
                  </button>
                </div>
              </div>
            );
          })}{" "}
          :{" "}
          {
            <p className="not-yet-shipped">
              Looking for an order? All of your orders have shipped.{" "}
              <a onClick={() => setCurrentInfo("Orders")} href="#">
                View all orders
              </a>
            </p>
          }
        </>
      )}
      {currentInfo === "Digital Orders" && (
        <>
          <div className="order-history">
            <label>
              <span>
                {Object.keys(storePurchasedItems).length}{" "}
                {Object.keys(storePurchasedItems).length.toString() === "1"
                  ? "Order"
                  : "Orders"}
              </span>{" "}
              placed in 2024
            </label>
          </div>
          <p
            style={{ display: "flex", justifyContent: "center" }}
            className="past-orders"
          >
            {select !== "2021" ? (
              <>You have not placed any orders in {`${select}.`}</>
            ) : (
              <p className="past-orders">
                You have not placed any orders in 2021.
              </p>
            )}
          </p>
        </>
      )}
      {currentInfo === "Local Store Orders" && (
        <>
          <div className="order-history">
            <label>
              <span>
                {Object.keys(storePurchasedItems).length}{" "}
                {Object.keys(storePurchasedItems).length.toString() === "1"
                  ? "Order"
                  : "Orders"}
              </span>{" "}
              placed in 2024
            </label>
          </div>
          <p
            style={{ display: "flex", justifyContent: "center" }}
            className="past-orders"
          >
            {select !== "2021" ? (
              <>You have not placed any orders in {`${select}.`}</>
            ) : (
              <p className="past-orders">
                You have not placed any orders in 2021.
              </p>
            )}
          </p>
        </>
      )}
      {currentInfo === "Cancelled Orders" && (
        <p className="cancelled-orders">
          We aren't finding any cancelled orders (for orders placed in the last
          6 months).
          <a onClick={() => setCurrentInfo("Orders")} href="#">
            View all orders
          </a>
        </p>
      )}
    </div>
  );
}
