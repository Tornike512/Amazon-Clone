import { useNavigate } from "react-router-dom";
import wishListBackground from "@src/assets/wish-list-background.png";

import "@src/views/WishList/WishList.scss";

export function WishList() {
  const navigate = useNavigate();

  return (
    <div className="wish-list-spacing">
      <div className="wish-list-page">
        <h1 className="your-lists">Your Lists</h1>
        <div className="wish-list">
          <img src={wishListBackground} alt="Wish List Background" />
          <span className="lists">Lists</span>
          <span className="shopping-needs">for all your shopping needs</span>
          <button
            onClick={() => navigate("/sign-in")}
            className="wish-list-sign-in"
          >
            Sign In
          </button>
          <div className="wish-list-info">
            <div className="add-items">
              <div>
                <span>Shoppin List</span>
                <p>Add items you want to shop for.</p>
              </div>
              <img src="" alt="Book Page Image" />

              <div className="let-people-know">
                <div>
                  <span>Wish List</span>
                  <p>Let people know what gifts you'd like.</p>
                </div>
                <img src="" alt="Gift Image" />
              </div>
            </div>
          </div>
        </div>
        <div className="wish-list-benefits">
          <>
            <div className="save-time">
              <img src="" alt="Checklist Image" />
              <h2>Save time</h2>
              <p>Add your items and ideas in one convenient location</p>
            </div>
            <div className="give-gifts">
              <img src="" alt="Gift Image" />
              <h2>Give great gifts</h2>
              <p>Remember your friends' lists and share yours</p>
            </div>
          </>
          <>
            <div className="check-price-changes">
              <img src="" alt="Graph Image" />
              <h2>Check price changes</h2>
              <p>Check when items from your lists drop in price</p>
            </div>
            <div className="get-notified">
              <img src="" alt="Bell Image" />
              <h2>Get notified about deals</h2>
              <p>Get push notifications for deals when using the mobile app</p>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
