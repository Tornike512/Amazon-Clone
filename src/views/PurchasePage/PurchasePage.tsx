import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "@src/providers/GlobalProvider";

import { AddCardModal } from "@src/components/AddCardModal";
import { AddAddressModal } from "@src/components/AddAddressModal";

import amazonBlackLogo from "@src/assets/amazon-logo-black.png";
import lockerIcon from "@src/assets/locker-icon.png";
import plusIcon from "@src/assets/plus-icon.png";
import blueCardImage from "@src/assets/blue-card-image.png";
import redCardImage from "@src/assets/red-card-image.png";

import "./PurchasePage.scss";

export function PurchasePage() {
  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [cardModal, setCardModal] = useState<boolean>(false);
  const [chooseAddress, setChooseAddress] = useState<boolean>(false);

  const {
    infoArray,
    setInfoArray,
    isEditMode,
    setIsEditMode,
    editCurrentAddress,
    setEditCurrentAddress,
  } = useContext(GlobalContext);

  const navigate = useNavigate();

  const itemCount = parseInt(
    localStorage.getItem("header cart count") ?? "0",
    10
  );

  useEffect(() => {
    const infoArray = localStorage.getItem("infoArray");
    if (infoArray) {
      setInfoArray(JSON.parse(infoArray));
    }
  }, [setInfoArray]);

  const removeAddress = (id: string) => {
    setInfoArray((prev) => prev.filter((address) => address.id !== id));

    const updatedInfoArray = infoArray.filter((address) => address.id !== id);
    localStorage.setItem("infoArray", JSON.stringify(updatedInfoArray));
  };

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
            {chooseAddress ? (
              <>
                <div>
                  <h2 className="shipping-address-text">
                    <label>1</label> Choose a shipping address
                  </h2>
                  <div className="shipping-address">
                    <h3>Your Addresses</h3>
                    <div>
                      {infoArray.map((info) => {
                        return (
                          <span
                            key={info.id}
                            style={
                              !info.select
                                ? {
                                    backgroundColor: `#ffffff`,
                                    border: `1px solid #ffffff`,
                                  }
                                : {}
                            }
                            className="address"
                          >
                            <span
                              onClick={() => {
                                setInfoArray((prev) =>
                                  prev.map((select) => ({
                                    ...select,
                                    select: select.id === info.id,
                                  }))
                                );
                              }}
                            >
                              <input type="radio" checked={info.select} />
                              <span className="filled-address">
                                <span>{info.fullNameInput}</span>{" "}
                                {info.addressInput}, {info.cityInput},{" "}
                                {info.zipCodeInput}
                              </span>
                            </span>
                            <div className="remove-edit">
                              <span
                                onClick={() => removeAddress(info.id)}
                                className="remove"
                              >
                                Remove
                              </span>
                              <span
                                onClick={() => {
                                  setEditCurrentAddress(info.id);
                                  setIsEditMode(true);
                                }}
                                className="edit"
                              >
                                Edit
                              </span>
                            </div>
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
              </>
            ) : (
              <>
                {infoArray.map((info) => {
                  return (
                    <>
                      <h2 className="chosen-address-text">
                        <label>1</label> Shipping address
                      </h2>
                      <ul>
                        <li>{info.fullNameInput}</li>
                        <li>{info.addressInput}</li>
                        <li>
                          {info.cityInput},{info.zipCodeInput}
                        </li>
                      </ul>
                      <a href="#">Change</a>
                    </>
                  );
                })}
              </>
            )}
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
      {(addressModal || isEditMode) && (
        <AddAddressModal
          closeModal={() => {
            setTimeout(() => {
              setAddressModal(false);
              setIsEditMode(false);
            }, 100);
          }}
        />
      )}
      {cardModal && <AddCardModal closeModal={() => setCardModal(false)} />}
    </div>
  );
}
