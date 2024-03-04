import amazonBlackLogo from "@src/assets/amazon-logo-black.png";
import lockerIcon from "@src/assets/locker-icon.png";
import plusIcon from "@src/assets/plus-icon.png";
import blueCardImage from "@src/assets/blue-card-image.png";
import redCardImage from "@src/assets/red-card-image.png";

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
          <div>
            <h2 className="shipping-address-text">
              <label>1</label> Choose a shipping address
            </h2>
            <div className="shipping-address">
              <h3>Your Addresses</h3>
              <div>
                <span className="address">
                  <input type="checkBox" />
                  <span className="filled-address">
                    <span>tornike tsagareishvili</span> chirgadze 4, tbilisi,
                    T'bilisi, 0108, Georgia Edit address
                  </span>
                </span>
                <span className="add-new-address">
                  <img src={plusIcon} alt="Plus Icon" />
                  <a href="#">Add a new address</a>
                </span>
              </div>

              <div className="use-this-address">
                <button>Use this address</button>
              </div>
            </div>
          </div>
          <div className="payment-method-container">
            <h2 className="payment-method-text">
              <label>2</label>
              Choose a payment method
            </h2>
            <div className="payment">
              <h3>Your credit and debit cards</h3>
              <div className="payment-definition">
                <span className="name-on-card-spacing">Name on card</span>
                <span>Expires on</span>
              </div>
              <div className="current-card">
                <input type="checkBox" />
                <img src={redCardImage} alt="Card Image" />
                <span className="card-info">
                  <span>Visa Gold</span> ending in 3449
                </span>
                <span className="card-user">tornike tsagareishvili</span>
                <span className="card-expire-date">08/2025</span>
              </div>
              <div className="add-card">
                <img className="plus-icon" src={plusIcon} alt="Plus Icon" />
                <img
                  className="add-card-image"
                  src={blueCardImage}
                  alt="Card Image"
                />
                <span>
                  <a href="">Add a credit or debit card</a>
                  <span className="amazon-accepts">
                    Amazon accepts all major credit cards.
                  </span>
                </span>
              </div>
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
        {/* <div className="Add-card-modal">
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
        </div> */}
      </div>
    </div>
  );
}
