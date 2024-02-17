import { useContext } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";

import searchIcon from "@src/assets/search-icon.png";

import "@src/views/OrderPage/OrderPage.scss";

interface TOrderInfo {
  id: string;
  name: string;
}

export function OrderPage() {
  const { currentInfo, setCurrentInfo } = useContext(GlobalContext);

  const orderInfos: TOrderInfo[] = [
    { id: "1", name: "Orders" },
    { id: "2", name: "Buy Again" },
    { id: "3", name: "Not Yet Shipped" },
    { id: "4", name: "Digital Orders" },
    { id: "5", name: "Local Store Orders" },
    { id: "6", name: "Cancelled Orders" },
  ];

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
              className="order-search-bar"
              type="text"
              placeholder="Search all orders"
            />
          </span>
          <button className="order-search-button">Search Orders</button>
        </div>
      </div>
      <ul className="order-infos">
        {orderInfos.map((orderInfo) => {
          return (
            <li
              onClick={() => setCurrentInfo(orderInfo.name)}
              key={orderInfo.id}
              className="order-infos-list"
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
              <span>0 Orders</span> placed in
            </label>
            <select name="orders-date" id="orders">
              <option value="last-30-days">last 30 days</option>
              <option value="past-3-months">past 3 months</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
          <p className="past-orders">
            You have not placed any orders in past 3 months.
            <a href="#"> View orders in 2024</a>
          </p>
        </>
      )}
    </div>
  );
}
