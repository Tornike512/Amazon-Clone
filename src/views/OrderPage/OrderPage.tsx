import "@src/views/OrderPage/OrderPage.scss";

export function OrderPage() {
  const orderInfos = [
    "Orders",
    "Buy Again",
    "Not Yet Shipped",
    "Digital Orders",
    "Local Store Orders",
    "Cancelled Orders",
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
          <span>
            <img src="" alt="Search Icon" />
            <input type="text" placeholder="Search all orders" />
          </span>
          <button>Search Orders</button>
        </div>
      </div>
      <ul className="order-infos">
        {orderInfos.map((orderInfo) => {
          return <li>{orderInfo}</li>;
        })}
      </ul>
      <span className="divider"></span>
      <div>
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
    </div>
  );
}
