import { useState } from "react";

import blackCloseIcon from "@src/assets/black-close-icon.png";

import { TPurchaseInfo } from "@src/@types/RequestTypes";

import "./AddAddressModal.scss";

export function AddAddressModal({
  closeModal,
  setFullName,
  setPhoneNumber,
  setAddress,
  setCity,
  setZipCode,
  setPurchaseInfo,
}: {
  closeModal: () => void;
  setFullName: (fullName: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setAddress: (address: string) => void;
  setCity: (city: string) => void;
  setZipCode: (zipCode: string) => void;
  setPurchaseInfo: (info: TPurchaseInfo[]) => void;
}) {
  const [fullNameInput, setFullNameInput] = useState<string>("");
  const [phoneNumberInput, setPHoneNumberInput] = useState<string>("");
  const [addressInput, setAddressInput] = useState<string>("");
  const [cityInput, setCityInput] = useState<string>("");
  const [zipCodeInput, setZipCodeInput] = useState<string>("");

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
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="full-name-input">
              <label>Full name (First and Last name)</label>
              <input
                onChange={(e) => {
                  setFullNameInput(e.target.value);
                  setFullName(e.target.value);
                }}
                type="text"
              />
            </div>
            <div className="phone-number-input">
              <label>Phone number</label>
              <input
                onChange={(e) => {
                  setPHoneNumberInput(e.target.value);
                  setPhoneNumber(e.target.value);
                }}
                type="text"
              />
            </div>
            <div className="address-input">
              <label>Address</label>
              <input
                onChange={(e) => {
                  setAddressInput(e.target.value);
                  setAddress(e.target.value);
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
                    setCity(e.target.value);
                  }}
                  className="city-input"
                  type="text"
                />
                <input
                  onChange={(e) => {
                    setZipCodeInput(e.target.value);
                    setZipCode(e.target.value);
                  }}
                  className="zip-code-input"
                  type="text"
                />
              </span>
            </div>
            <div className="use-address-button">
              <button
                onClick={() => {
                  setFullName(fullNameInput);
                  setPhoneNumber(phoneNumberInput);
                  setAddress(addressInput);
                  setCity(cityInput);
                  setZipCode(zipCodeInput);
                  setPurchaseInfo([
                    {
                      fullName: fullNameInput,
                      phoneNumber: phoneNumberInput,
                      address: addressInput,
                      city: cityInput,
                      zipCode: zipCodeInput,
                    },
                  ]);
                  closeModal();
                }}
              >
                Use this address
              </button>
            </div>
          </form>
        </div>
      </div>
      <div onClick={closeModal} className="modal-background"></div>
    </div>
  );
}
