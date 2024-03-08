import { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { GlobalContext } from "@src/providers/GlobalProvider";

import blackCloseIcon from "@src/assets/black-close-icon.png";

import "./AddAddressModal.scss";
import { info } from "sass";

export function AddAddressModal({ closeModal }: { closeModal: () => void }) {
  const [fullNameInput, setFullNameInput] = useState<string>("");
  const [phoneNumberInput, setPhoneNumberInput] = useState<string>("");
  const [addressInput, setAddressInput] = useState<string>("");
  const [cityInput, setCityInput] = useState<string>("");
  const [zipCodeInput, setZipCodeInput] = useState<string>("");

  const {
    infoArray,
    setInfoArray,
    isEditMode,
    setIsEditMode,
    editCurrentAddress,
  } = useContext(GlobalContext);

  const uniqueId = uuidv4();

  function handleInfo() {
    setAddressInput(addressInput);
    setFullNameInput(fullNameInput);
    setPhoneNumberInput(phoneNumberInput);
    setCityInput(cityInput);
    setZipCodeInput(zipCodeInput);

    if (
      addressInput !== "" &&
      fullNameInput !== "" &&
      phoneNumberInput !== "" &&
      cityInput !== "" &&
      zipCodeInput !== ""
    ) {
      setInfoArray((infoArray) => [
        ...infoArray,
        {
          id: uniqueId,
          addressInput: addressInput,
          fullNameInput: fullNameInput,
          phoneNumberInput: phoneNumberInput,
          cityInput: cityInput,
          zipCodeInput: zipCodeInput,
        },
      ]);
      closeModal();
    }
  }

  useEffect(() => {
    localStorage.setItem("infoArray", JSON.stringify(infoArray));
  }, [infoArray]);

  const editAddress = infoArray.filter((address) => {
    return address.id === editCurrentAddress;
  });

  console.log(editAddress);

  return (
    <div className="add-address-modal">
      <div className="add-address">
        <div className="address-modal-header">
          <span>Enter a new shipping address</span>
          <button onClick={closeModal} className="close-modal">
            <img src={blackCloseIcon} alt="Close Image" />
          </button>
        </div>
        <div className="address-modal-info">
          <h1 className="add-address-text">Add a new address</h1>
          {isEditMode ? (
            <>
              {editAddress.map((address) => {
                return (
                  <form key={address.id} onSubmit={(e) => e.preventDefault()}>
                    <div className="full-name-input">
                      <label>Full name (First and Last name)</label>
                      <input
                        value={address.fullNameInput}
                        onChange={(e) => {
                          setFullNameInput(e.target.value);
                        }}
                        type="text"
                      />
                    </div>
                    <div className="phone-number-input">
                      <label>Phone number</label>
                      <input
                        onChange={(e) => {
                          setPhoneNumberInput(e.target.value);
                        }}
                        type="text"
                      />
                    </div>
                    <div className="address-input">
                      <label>Address</label>
                      <input
                        onChange={(e) => {
                          setAddressInput(e.target.value);
                        }}
                        type="text"
                        placeholder="Street address or P.O. Box"
                      />
                    </div>
                    <div className="city-zip-spacing">
                      <span className="city-zip-label">
                        <label className="city-label">City</label>
                        <label>ZIP Code</label>
                      </span>
                      <span>
                        <input
                          onChange={(e) => {
                            setCityInput(e.target.value);
                          }}
                          className="city-input"
                          type="text"
                        />
                        <input
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
                        }}
                      >
                        Use this address
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
                  <label>Full name (First and Last name)</label>
                  <input
                    onChange={(e) => {
                      setFullNameInput(e.target.value);
                    }}
                    type="text"
                  />
                </div>
                <div className="phone-number-input">
                  <label>Phone number</label>
                  <input
                    onChange={(e) => {
                      setPhoneNumberInput(e.target.value);
                    }}
                    type="text"
                  />
                </div>
                <div className="address-input">
                  <label>Address</label>
                  <input
                    onChange={(e) => {
                      setAddressInput(e.target.value);
                    }}
                    type="text"
                    placeholder="Street address or P.O. Box"
                  />
                </div>
                <div className="city-zip-spacing">
                  <span className="city-zip-label">
                    <label className="city-label">City</label>
                    <label>ZIP Code</label>
                  </span>
                  <span>
                    <input
                      onChange={(e) => {
                        setCityInput(e.target.value);
                      }}
                      className="city-input"
                      type="text"
                    />
                    <input
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
                    }}
                  >
                    Use this address
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
