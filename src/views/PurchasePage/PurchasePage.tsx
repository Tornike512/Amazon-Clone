import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "@src/providers/GlobalProvider";

import { AddCardModal } from "@src/components/AddCardModal";
import { AddAddressModal } from "@src/components/AddAddressModal";

import amazonBlackLogo from "@src/assets/amazon-logo-black.png";
import lockerIcon from "@src/assets/locker-icon.png";
import plusIcon from "@src/assets/plus-icon.png";
import blueCardImage from "@src/assets/blue-card-image.png";
import redCardImage from "@src/assets/red-card-image.png";

import { TPurchaseAddressInfo } from "@src/@types/RequestTypes";

import "./PurchasePage.scss";

export function PurchasePage() {
  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [cardModal, setCardModal] = useState<boolean>(false);

  const {
    addressInput,
    cityInput,
    zipCodeInput,
    phoneNumberInput,
    fullNameInput,
    confirmAddress,
    infoArray,
  } = useContext(GlobalContext);

  const navigate = useNavigate();

  const itemCount = parseInt(
    localStorage.getItem("header cart count") ?? "0",
    10
  );

  return (
    <div>
      <div className="purchase-page">
        <header className="purchase-page-header">
          <span className="purchase-header-spacing">
            <img
              onClick={() => navigate("/")}
              className="amazon-logo"
              src={amazonBlackLogo}
              alt="Amazon Logo"
            />
            <span className="checkout-text">
              Checkout{" "}
              <a onClick={() => navigate("/cart")}>
                ({itemCount}{" "}
                {itemCount === 0 || itemCount === 1 ? <>item</> : <>items</>})
              </a>
            </span>
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
                  {infoArray.map((info) => {
                    return (
                      <span className="address">
                        <input type="checkBox" />
                        <span className="filled-address">
                          <span>{info.fullNameInput}</span> {info.addressInput},{" "}
                          {info.cityInput}, {info.zipCodeInput}
                        </span>
                      </span>
                    );
                  })}
                  <span
                    onClick={() => setAddressModal(true)}
                    className="add-new-address"
                  >
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
                <div onClick={() => setCardModal(true)} className="add-card">
                  <img className="plus-icon" src={plusIcon} alt="Plus Icon" />
                  <img
                    className="add-card-image"
                    src={blueCardImage}
                    alt="Card Image"
                  />
                  <span>
                    <a href="#">Add a credit or debit card</a>
                    <span className="amazon-accepts">
                      Amazon accepts all major credit cards.
                    </span>
                  </span>
                </div>
                <div className="use-payment-method">
                  <button>Use this payment method</button>
                </div>
              </div>
            </div>
          </section>
          <section className="buy-container">
            <button className="buy-button">Place your order in USD</button>
            <p className="choose-payment-text">
              By placing your order, you agree to Amazon's privacy notice and
              conditions of use.
            </p>
            <h3>Order summary</h3>
            <span className="order-items">
              <span>Subtotal (9 items): </span>
              <span>$14.44</span>
            </span>
            <span className="shipping-handling">
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
        </div>
      </div>
      {addressModal && (
        <AddAddressModal closeModal={() => setAddressModal(false)} />
      )}
      {cardModal && <AddCardModal closeModal={() => setCardModal(false)} />}
    </div>
  );
}
