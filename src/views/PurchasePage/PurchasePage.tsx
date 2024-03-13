import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { v4 as uuidv4 } from "uuid";

import { AddCardModal } from "@src/components/AddCardModal";
import { AddAddressModal } from "@src/components/AddAddressModal";

import amazonBlackLogo from "@src/assets/amazon-logo-black.png";
import lockerIcon from "@src/assets/locker-icon.png";
import plusIcon from "@src/assets/plus-icon.png";
import blueCardImage from "@src/assets/blue-card-image.png";
import redCardImage from "@src/assets/red-card-image.png";

import "./PurchasePage.scss";
import { Select } from "flowbite-react";

export function PurchasePage() {
  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [cardModal, setCardModal] = useState<boolean>(false);
  const [currentCardId, setCurrentCardId] = useState<string>("");

  const {
    infoArray,
    setInfoArray,
    isEditMode,
    setIsEditMode,
    editCurrentAddress,
    setEditCurrentAddress,
    chooseAddress,
    setChooseAddress,
    cards,
    setCards,
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

  useEffect(() => {
    if (!chooseAddress) {
      setChooseAddress(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chooseAddress", JSON.stringify(chooseAddress));
  }, [chooseAddress]);

  const selectedAddress = infoArray.filter((info) => {
    return info.id === editCurrentAddress;
  });

  useEffect(() => {
    localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
  }, [selectedAddress]);

  const removeAddress = (id: string) => {
    setInfoArray((prev) => prev.filter((address) => address.id !== id));

    const updatedInfoArray = infoArray.filter((address) => address.id !== id);
    localStorage.setItem("infoArray", JSON.stringify(updatedInfoArray));
  };

  useEffect(() => {
    localStorage.setItem("editCurrentAddress", editCurrentAddress);
  }, [editCurrentAddress]);

  useEffect(() => {
    localStorage.setItem("stored cards", JSON.stringify(cards));
  }, [cards]);

  console.log(currentCardId);

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
            {!chooseAddress ? (
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
                                setEditCurrentAddress(info.id);
                                setInfoArray((prev) =>
                                  prev.map((select) => ({
                                    ...select,
                                    select:
                                      select.id === info.id ? true : false,
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
                      <button
                        onClick={() => {
                          setTimeout(() => {
                            setChooseAddress(true);
                          }, 100);
                        }}
                      >
                        Use this address
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {selectedAddress?.map((info: any) => {
                  return (
                    <div key={info.id} className="chosen-address-spacing">
                      <h2 className="chosen-address-text">
                        <label>1</label> Shipping address
                      </h2>
                      <ul className="person-info">
                        <li>{info.fullNameInput}</li>
                        <li>{info.addressInput}</li>
                        <li>
                          {info.cityInput},{info.zipCodeInput}
                        </li>
                      </ul>
                      <a
                        onClick={() => {
                          setTimeout(() => {
                            setChooseAddress(false);
                          }, 100);
                        }}
                        className="change-chosen-address"
                        href="#"
                      >
                        Change
                      </a>
                    </div>
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
                {cards.map((card) => {
                  return (
                    <div
                      key={card.id}
                      onClick={() => {
                        setCurrentCardId(card.id);
                        setCards((prev) =>
                          prev.map((prevCard) =>
                            prevCard.id === card.id
                              ? { ...prevCard, select: true }
                              : { ...prevCard, select: false }
                          )
                        );
                      }}
                      style={
                        !card.select
                          ? {
                              backgroundColor: "#ffffff",
                              border: "1px solid #ffffff",
                            }
                          : {}
                      }
                      className="current-card"
                    >
                      <div className="checkbox-spacing">
                        <input checked={card.select} type="checkBox" />
                        <img src={redCardImage} alt="Card Image" />
                      </div>
                      <span className="card-info">
                        <span>Visa Gold</span> ending in{" "}
                        {card.cardNumber.slice(card.cardNumber.length - 4)}
                      </span>
                      <span className="card-user">{card.nameOnCard}</span>
                      <span className="card-expire-date">{`${card.months}/${card.years}`}</span>
                    </div>
                  );
                })}
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
