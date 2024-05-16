import { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { useIntl, FormattedMessage } from "react-intl";

import exclamationPoint from "@src/assets/exclamation-point-logo.png";
import blackCloseIcon from "@src/assets/black-close-icon.png";

import "./AddAddressModal.scss";

interface TaddressWarning {
  fullNameWarning: boolean;
  phoneNumberWarning: boolean;
  addressWarning: boolean;
  cityWarning: boolean;
  zipCodeWarning: boolean;
}

export function AddAddressModal({ closeModal }: { closeModal: () => void }) {
  const [addressWarning, setAddressWarning] = useState<TaddressWarning>({
    fullNameWarning: false,
    phoneNumberWarning: false,
    addressWarning: false,
    cityWarning: false,
    zipCodeWarning: false,
  });
  const [isValid, setIsValid] = useState<boolean>(false);

  const {
    infoArray,
    setInfoArray,
    isEditMode,
    setIsEditMode,
    editCurrentAddress,
    chooseAddress,
    setChooseAddress,
    fullNameInput,
    setFullNameInput,
    cityInput,
    setCityInput,
    addressInput,
    setAddressInput,
    zipCodeInput,
    setZipCodeInput,
    phoneNumberInput,
    setPhoneNumberInput,
  } = useContext(GlobalContext);

  const uniqueId = uuidv4();

  const { formatMessage } = useIntl();

  useEffect(() => {
    if (isEditMode) {
      setTimeout(() => {
        if (infoArray.length > 0) {
          const currentAddress = infoArray[infoArray.length - 1];
          console.log(currentAddress);
          setFullNameInput(currentAddress.fullNameInput);
          setPhoneNumberInput(currentAddress.phoneNumberInput);
          setAddressInput(currentAddress.addressInput);
          setCityInput(currentAddress.cityInput);
          setZipCodeInput(currentAddress.zipCodeInput);
        }
      }, 100);
    }
  }, []);

  function handleInfo() {
    if (
      addressInput !== "" &&
      fullNameInput !== "" &&
      phoneNumberInput !== "" &&
      cityInput !== "" &&
      zipCodeInput !== ""
    ) {
      if (isEditMode) {
        const updatedInfoArray = infoArray.map((address) => {
          if (address.id === editCurrentAddress) {
            return {
              ...address,
              select: true,
              addressInput: addressInput,
              fullNameInput: fullNameInput,
              phoneNumberInput: phoneNumberInput,
              cityInput: cityInput,
              zipCodeInput: zipCodeInput,
            };
          }
          return address;
        });
        setInfoArray(updatedInfoArray);
      } else {
        setInfoArray((infoArray) => [
          ...infoArray,
          {
            id: uniqueId,
            select: false,
            addressInput: addressInput,
            fullNameInput: fullNameInput,
            phoneNumberInput: phoneNumberInput,
            cityInput: cityInput,
            zipCodeInput: zipCodeInput,
          },
        ]);
      }
      closeModal();
    }
  }

  useEffect(() => {
    localStorage.setItem("infoArray", JSON.stringify(infoArray));
  }, [infoArray]);

  const filterAddress = infoArray.filter((address) => {
    return address.id === editCurrentAddress;
  });

  const showWarnings = () => {
    let newWarnings = { ...addressWarning };
    let isValid = true;

    if (fullNameInput === "") {
      newWarnings = { ...newWarnings, fullNameWarning: true };
      isValid = false;
    } else {
      newWarnings = { ...newWarnings, fullNameWarning: false };
      isValid = true;
    }
    if (phoneNumberInput === "") {
      newWarnings = { ...newWarnings, phoneNumberWarning: true };
      isValid = false;
    } else {
      newWarnings = { ...newWarnings, phoneNumberWarning: false };
      isValid = true;
    }
    if (addressInput === "") {
      newWarnings = { ...newWarnings, addressWarning: true };
      isValid = false;
    } else {
      newWarnings = { ...newWarnings, addressWarning: false };
      isValid = true;
    }
    if (cityInput === "") {
      newWarnings = { ...newWarnings, cityWarning: true };
      isValid = false;
    } else {
      newWarnings = { ...newWarnings, cityWarning: false };
      isValid = true;
    }
    if (zipCodeInput === "") {
      newWarnings = { ...newWarnings, zipCodeWarning: true };
      isValid = false;
    } else {
      newWarnings = { ...newWarnings, zipCodeWarning: false };
      isValid = true;
    }

    setAddressWarning(newWarnings);
    setIsValid(isValid);
  };

  return (
    <div className="add-address-modal">
      <div className="add-address">
        <div className="address-modal-header">
          <span>
            <FormattedMessage id="enter a new shipping address" />
          </span>
          <button onClick={closeModal} className="close-modal">
            <img src={blackCloseIcon} alt="Close Image" />
          </button>
        </div>
        <div className="address-modal-info">
          <h1 className="add-address-text">
            <FormattedMessage id="add a new address" />
          </h1>
          {isEditMode ? (
            <>
              {filterAddress.map((address) => {
                return (
                  <form key={address.id} onSubmit={(e) => e.preventDefault()}>
                    <div className="full-name-input">
                      <label>
                        <FormattedMessage id="full name (first and last name)" />
                      </label>
                      <input
                        defaultValue={address.fullNameInput}
                        onChange={(e) => {
                          setFullNameInput(e.target.value);
                        }}
                        type="text"
                      />
                    </div>
                    <div className="phone-number-input">
                      <label>
                        <FormattedMessage id="phone number" />
                      </label>
                      <input
                        defaultValue={address.phoneNumberInput}
                        onChange={(e) => {
                          setPhoneNumberInput(e.target.value);
                        }}
                        type="text"
                      />
                    </div>
                    <div className="address-input">
                      <label>Address</label>
                      <input
                        defaultValue={address.addressInput}
                        onChange={(e) => {
                          setAddressInput(e.target.value);
                        }}
                        type="text"
                        placeholder={formatMessage({
                          id: "street address or p.o. box",
                        })}
                      />
                    </div>
                    <div className="city-zip-spacing">
                      <span className="city-zip-label">
                        <label className="city-label">
                          <FormattedMessage id="city" />
                        </label>
                        <label>
                          <FormattedMessage id="zip code" />
                        </label>
                      </span>
                      <span>
                        <input
                          defaultValue={address.cityInput}
                          onChange={(e) => {
                            setCityInput(e.target.value);
                          }}
                          className="city-input"
                          type="text"
                        />
                        <input
                          defaultValue={address.zipCodeInput}
                          onChange={(e) => {
                            setZipCodeInput(e.target.value);
                          }}
                          className="zip-code-input"
                          type="text"
                        />
                      </span>
                    </div>
                    <div className="use-address-button">
                      <button
                        onClick={() => {
                          handleInfo();
                          setInfoArray((prev) =>
                            prev.map((select) => ({
                              ...select,
                              select: select.id === address.id,
                            }))
                          );
                        }}
                      >
                        <FormattedMessage id="use this address" />
                      </button>
                    </div>
                  </form>
                );
              })}
            </>
          ) : (
            <>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="full-name-input">
                  <label>
                    <FormattedMessage id="full name (first and last name)" />
                  </label>
                  <input
                    defaultValue={fullNameInput}
                    onChange={(e) => {
                      setFullNameInput(e.target.value);
                    }}
                    type="text"
                  />
                  {addressWarning.fullNameWarning && (
                    <p className="warning">
                      <img src={exclamationPoint} alt="Exclamation Points" />
                      <FormattedMessage id="please enter your full name." />
                    </p>
                  )}
                </div>
                <div className="phone-number-input">
                  <label>
                    <FormattedMessage id="phone number" />
                  </label>
                  <input
                    defaultValue={phoneNumberInput}
                    onChange={(e) => {
                      setPhoneNumberInput(e.target.value);
                    }}
                    type="text"
                  />
                  {addressWarning.phoneNumberWarning && (
                    <p className="warning">
                      <img src={exclamationPoint} alt="Exclamation Points" />
                      <FormattedMessage id="please enter your phone number." />
                    </p>
                  )}
                </div>
                <div className="address-input">
                  <label>
                    <FormattedMessage id="address" />
                  </label>
                  <input
                    defaultValue={addressInput}
                    onChange={(e) => {
                      setAddressInput(e.target.value);
                    }}
                    type="text"
                    placeholder={formatMessage({
                      id: "street address or p.o. box",
                    })}
                  />
                  {addressWarning.addressWarning && (
                    <p className="warning">
                      <img src={exclamationPoint} alt="Exclamation Points" />
                      <FormattedMessage id="please enter your address" />
                    </p>
                  )}
                </div>
                <div className="city-zip-spacing">
                  <span className="city-zip-label">
                    <label className="city-label">
                      <FormattedMessage id="city" />
                    </label>
                  </span>
                  <span>
                    <input
                      defaultValue={cityInput}
                      onChange={(e) => {
                        setCityInput(e.target.value);
                      }}
                      className="city-input"
                      type="text"
                    />

                    {addressWarning.cityWarning && (
                      <p className="warning">
                        <img src={exclamationPoint} alt="Exclamation Points" />
                        <FormattedMessage id="please enter your city name." />
                      </p>
                    )}
                    <p className="zip-code-text">
                      <FormattedMessage id="zip code" />
                    </p>
                    <input
                      defaultValue={zipCodeInput}
                      onChange={(e) => {
                        setZipCodeInput(e.target.value);
                      }}
                      className="zip-code-input"
                      type="text"
                    />
                    {addressWarning.zipCodeWarning && (
                      <p className="warning">
                        <img src={exclamationPoint} alt="Exclamation Points" />
                        <FormattedMessage id="please enter your zip code." />
                      </p>
                    )}
                  </span>
                </div>
                <div className="use-address-button">
                  <button
                    onClick={() => {
                      showWarnings();
                      handleInfo();
                    }}
                  >
                    <FormattedMessage id="use this address" />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
      <div onClick={closeModal} className="modal-background"></div>
    </div>
  );
}
