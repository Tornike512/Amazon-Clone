import amazonBlackLogo from "@src/assets/amazon-logo-black.png";
import lockerIcon from "@src/assets/locker-icon.png";

import "./PurchasePage.scss";

export function PurchasePage() {
  return (
    <div className="purchase-page">
      <header className="purchase-page-header">
        <span className="purchase-header-spacing">
          <img
            className="amazon-logo"
            src={amazonBlackLogo}
            alt="Amazon Logo"
          />
          <span className="checkout-text">Checkout x items</span>
          <img className="locker-logo" src={lockerIcon} alt="Locker Logo" />
        </span>
      </header>
      <div className="purchase-info">
        <section>
          <h1 className="payment-method-text">2 Choose a payment method </h1>
          <div className="payment">
            <h2>Your credit and debit cards</h2>
            <div>
              <span>Name on card</span>
              <span>Expires on</span>
            </div>
            <div>
              <img src="" alt="Plus Icon" />
              <img src="" alt="Card Icon" />
              <span>
                <a href="">Add a credit or debit card</a>
                Amazon accepts all major credit cards.
              </span>
            </div>
          </div>
        </section>
        <section className="buy-container">
          <button className="buy-button">Use this payment method</button>
          <p className="choose-payment-text">
            Choose a payment method to continue checking out. You'll still have
            a chance to review and edit your order before it's final.
          </p>
          <h3>Order summary</h3>
          <span className="order-items">
            <span>items:</span>
            <span>$14.44</span>
          </span>
          <span className="shopping-handling">
            <span>Shipping & handling:</span>
            <span>$13.39</span>
          </span>
          <span className="total-tax">
            <span>Total before tax:</span>
            <span>$27.83</span>
          </span>
          <span className="order-total">
            <span>Order Total:</span>
            <span>$27.83</span>
          </span>
        </section>

        <div className="Add-card-modal">
          <header>
            <div className="card-modal-header-text">
              <span>Add a credit or debit card</span>
              <img src="" alt="Close Image" />
            </div>
            <div className="add-card">
              <div className="card-details">
                <span className="card-number">
                  <label>Card number</label>
                  <input />
                </span>
                <span className="name-on-card">
                  <label>Name on card</label>
                  <input />
                </span>
                <span className="expiration-date">
                  <select name="" id="">
                    <option value=""></option>
                  </select>
                  <select name="" id="">
                    <option value=""></option>
                  </select>
                </span>
              </div>
              <div className="acceoted-cards">
                <p>Amazon accepts all major credit and debit cards:</p>
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
              </div>
              <span className="cancel-or-add">
                <button className="cancel-button">Cancel</button>
                <button className="add-card-button">Add your card</button>
              </span>
            </div>
          </header>
        </div>
      </div>
    </div>
  );
}
