import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { usePurchaseProducts } from "@src/hooks/usePurchaseProducts";
import { FormattedMessage } from "react-intl";

import { TGetProducts } from "@src/@types/RequestTypes";

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
  const [currentCardId, setCurrentCardId] = useState<string>(() => {
    const storedCardId = localStorage.getItem("current card id");
    return storedCardId ? JSON.parse(storedCardId) : "";
  });
  const [selectCard, setSelectCard] = useState<boolean>(() => {
    const storeSelectedCard = localStorage.getItem("selected card");
    return storeSelectedCard ? JSON.parse(storeSelectedCard) : false;
  });
  const [deliveryOption, setDeliveryOption] = useState<boolean>(() => {
    const storedDeliveryOption = localStorage.getItem("delivery option");
    return storedDeliveryOption ? JSON.parse(storedDeliveryOption) : false;
  });

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
    purchasedItem,
    setPurchasedItem,
    setSuccessfulPurchase,
    setCountCartProducts,
  } = useContext(GlobalContext);

  const navigate = useNavigate();

  const { purchaseProducts } = usePurchaseProducts();

  const itemCount = parseInt(
    localStorage.getItem("header cart count") ?? "0",
    10
  );

  const storedTotalPrice = JSON.parse(
    localStorage.getItem("total price") || "{}"
  );

  const savedProducts = localStorage.getItem("saved products") || "";

  const storedPurchasedItem = JSON.parse(
    localStorage.getItem("purchased item") || "{}"
  );

  useEffect(() => {
    localStorage.setItem("current card id", JSON.stringify(currentCardId));
  }, [currentCardId]);

  useEffect(() => {
    localStorage.setItem("total price", JSON.stringify(storedTotalPrice));
  }, [storedTotalPrice]);

  useEffect(() => {
    localStorage.setItem("selected card", JSON.stringify(selectCard));
  }, [selectCard]);

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

  const selectedCard = cards.filter((card) => {
    return currentCardId === card.id;
  });

  useEffect(() => {
    localStorage.setItem("delivery option", JSON.stringify(deliveryOption));
  }, [deliveryOption]);

  const filterPurchaseProducts = purchaseProducts.filter((purchaseProduct) => {
    return !savedProducts.includes(purchaseProduct.cartProduct.id);
  });

  const filterByPurchasedProducts = filterPurchaseProducts.filter((item) => {
    return !storedPurchasedItem
      .map((stored: any) => stored.id)
      .includes(item.cartProduct.id);
  });

  const totalPrice = localStorage.getItem("total price");

  const orderTotal = Number(totalPrice) + 0.99 + 13.39 + 27.83;

  useEffect(() => {
    localStorage.setItem("purchased item", JSON.stringify(purchasedItem));
  }, [purchasedItem]);

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
              <FormattedMessage id="checkout" />{" "}
              <a onClick={() => navigate("/cart")}>
                ({itemCount - Object.keys(storedPurchasedItem).length}{" "}
                {itemCount - Object.keys(storedPurchasedItem).length === 0 ||
                itemCount - Object.keys(storedPurchasedItem).length === 1 ? (
                  <>
                    <FormattedMessage id="item" />
                  </>
                ) : (
                  <>
                    <FormattedMessage id="items" />
                  </>
                )}
                )
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
                    <label>1</label>{" "}
                    <FormattedMessage id="choose a shipping address" />
                  </h2>
                  <div className="shipping-address">
                    <h3>
                      <FormattedMessage id="your addresses" />
                    </h3>
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
                                <FormattedMessage id="remove" />
                              </span>
                              <span
                                onClick={() => {
                                  setEditCurrentAddress(info.id);
                                  setIsEditMode(true);
                                }}
                                className="edit"
                              >
                                <FormattedMessage id="edit" />
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
                        <a href="#">
                          <FormattedMessage id="add a new address" />
                        </a>
                      </span>
                    </div>

                    <div className="use-this-address">
                      <button
                        onClick={() => {
                          if (selectedAddress.length === 0) {
                            setTimeout(() => {
                              setChooseAddress(false);
                            }, 100);
                            setChooseAddress(false);
                          } else {
                            setTimeout(() => {
                              setChooseAddress(true);
                            }, 100);
                            setChooseAddress(true);
                          }
                        }}
                      >
                        <FormattedMessage id="use this address" />
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
                        <label>1</label>{" "}
                        <FormattedMessage id="shipping address" />
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
                          setTimeout(() => {
                            setSelectCard(true);
                          }, 100);
                        }}
                        className="change-chosen-address"
                        href="#"
                      >
                        <FormattedMessage id="change" />
                      </a>
                    </div>
                  );
                })}
              </>
            )}
            {!selectCard ? (
              <>
                <div className="payment-method-container">
                  <h2 className="payment-method-text">
                    <label>2</label>
                    <FormattedMessage id="choose a payment method" />
                  </h2>
                  <div className="payment">
                    <h3>
                      <FormattedMessage id="your credit and debit cards" />
                    </h3>
                    <div className="payment-definition">
                      <span className="name-on-card-spacing">
                        <FormattedMessage id="name on card" />
                      </span>
                      <span>
                        <FormattedMessage id="expires on" />
                      </span>
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
                            <span>
                              <FormattedMessage id="visa gold" />
                            </span>{" "}
                            <FormattedMessage id="ending in" />{" "}
                            {card.cardNumber.slice(card.cardNumber.length - 4)}
                          </span>
                          <span className="card-user">{card.nameOnCard}</span>
                          <span className="card-expire-date">{`${card.months}/${card.years}`}</span>
                        </div>
                      );
                    })}
                    <div
                      onClick={() => setCardModal(true)}
                      className="add-card"
                    >
                      <img
                        className="plus-icon"
                        src={plusIcon}
                        alt="Plus Icon"
                      />
                      <img
                        className="add-card-image"
                        src={blueCardImage}
                        alt="Card Image"
                      />
                      <span>
                        <a href="#">
                          <FormattedMessage id="add a credit or debit card" />
                        </a>
                        <span className="amazon-accepts">
                          <FormattedMessage id="amazon accepts all major credit cards." />
                        </span>
                      </span>
                    </div>
                    <div className="use-payment-method">
                      <button
                        onClick={() => {
                          setTimeout(() => {
                            setSelectCard(true);
                          }, 100);
                        }}
                      >
                        <FormattedMessage id="use this payment method" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="selected-card">
                <h2 className="selected-card-text">
                  <label>2</label>
                  <FormattedMessage id="payment method" />
                </h2>

                {selectedCard?.map((card) => (
                  <div key={card.id}>
                    <div className="selected-card-info">
                      <span className="selected-card-digits">{`Paying with Visa ${card.cardNumber.slice(
                        card.cardNumber.length - 4
                      )}`}</span>
                      {selectedAddress?.map((address, index) => (
                        <span key={index} className="selected-card-address">
                          {`${address.fullNameInput}, ${address.addressInput}, ${address.cityInput}`}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

                <a
                  onClick={() => {
                    setTimeout(() => {
                      setSelectCard(false);
                    }, 100);
                    setChooseAddress(true);
                  }}
                  className="change-selected-card"
                  href="#"
                >
                  <FormattedMessage id="change" />
                </a>
              </div>
            )}
            <div className="purchase-page-products">
              <h2 className="purchase-page-products-text">
                <label>3</label>
                <FormattedMessage id="review items and shipping" />
              </h2>
              <div className="current-products">
                <h2 className="arrival-time">
                  <FormattedMessage id="arriving mar 26 2024" />
                </h2>
                <p className="current-products-paragraph">
                  <FormattedMessage id="items shipped from amazon com" />
                </p>
                <div className="current-products-list">
                  <div className="list">
                    {filterByPurchasedProducts.map((purchaseProduct) => {
                      return (
                        <div
                          key={purchaseProduct.cartProduct.id}
                          className="current-product"
                        >
                          <div className="current-product-image">
                            <img
                              src={purchaseProduct.cartProduct.image}
                              alt="Product Image"
                            />
                          </div>
                          <div>
                            <span className="product-title">
                              {purchaseProduct.cartProduct.title}
                            </span>
                            <h4 className="product-price">{`$ ${purchaseProduct.cartProduct.salePrice}.99`}</h4>
                            <span className="purchase-page-quantity">
                              <FormattedMessage id="quantity:" />{" "}
                              {`${purchaseProduct.count}`}
                            </span>
                            <p className="sold-by-amazon">
                              <FormattedMessage id="sold by:amazon.com services, Inc." />
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="choose-delivery-option">
                    <label>
                      <FormattedMessage id="choose a delivery option" />:
                    </label>
                    <span className="delivery-time">
                      <input
                        checked={true}
                        onClick={() => setDeliveryOption(true)}
                        type="radio"
                      />
                      <span>
                        <FormattedMessage id="tuesday mar 26" />
                      </span>
                    </span>
                    <span className="delivery-price">
                      <FormattedMessage id="$13.39 - delivery" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="buy-container">
            <button
              onClick={() => {
                setPurchasedItem(
                  purchaseProducts.map((item) => ({
                    id: item.cartProduct.id,
                  })) as TGetProducts[]
                );
                navigate("/orders");
                setSuccessfulPurchase(true);
                setCountCartProducts(0);
                localStorage.setItem("total price", JSON.stringify(0));
              }}
              className="buy-button"
            >
              <FormattedMessage id="place your order in usd" />
            </button>
            <p className="choose-payment-text">
              <FormattedMessage id="by placing your order you agree to amazons privacy notice and conditions of use" />
            </p>
            <h3>
              <FormattedMessage id="order summary" />
            </h3>
            <span className="order-items">
              <span>
                <FormattedMessage id="subtotal" /> ({itemCount}{" "}
                {itemCount < 2 ? "item" : "items"}):{" "}
              </span>
              <span>{`$${totalPrice}.99`}</span>
            </span>
            <span className="shipping-handling">
              <span>
                <FormattedMessage id="shipping and handling" />:
              </span>
              <span>$13.39</span>
            </span>
            <span className="total-tax">
              <span>
                <FormattedMessage id="total before tax" />:
              </span>
              <span>$27.83</span>
            </span>
            <span className="order-total">
              <span>
                <FormattedMessage id="order total" />:
              </span>
              <span>{`$${orderTotal.toFixed(2)}`}</span>
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
