import { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { GlobalContext } from "@src/providers/GlobalProvider";

import blackCloseIcon from "@src/assets/black-close-icon.png";

import "./AddAddressModal.scss";

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

  useEffect(() => {
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

    // Cleanup function to clear the timer
  }, []); // Run this effect only once after component mounting

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
              {filterAddress.map((address) => {
                return (
                  <form key={address.id} onSubmit={(e) => e.preventDefault()}>
                    <div className="full-name-input">
                      <label>Full name (First and Last name)</label>
                      <input
                        defaultValue={address.fullNameInput}
                        onChange={(e) => {
                          setFullNameInput(e.target.value);
                        }}
                        type="text"
                      />
                    </div>
                    <div className="phone-number-input">
                      <label>Phone number</label>
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
