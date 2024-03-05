import blackCloseIcon from "@src/assets/black-close-icon.png";

import "./AddAddressModal.scss";

export function AddAddressModal() {
  return (
    <div className="add-address-modal">
      <div className="add-address">
        <div className="address-modal-header">
          <span>Enter a new shipping address</span>
          <button className="close-modal">
            <img src={blackCloseIcon} alt="Close Image" />
          </button>
        </div>
        <div className="address-modal-info">
          <h1 className="add-address-text">Add a new address</h1>
          <form>
            <div className="full-name-input">
              <label>Full name (First and Last name)</label>
              <input type="text" />
            </div>
            <div className="phone-number-input">
              <label>Phone number</label>
              <input type="text" />
            </div>
            <div className="address-input">
              <label>Address</label>
              <input type="text" placeholder="Street address or P.O. Box" />
            </div>
            <div className="city-zip-spacing">
              <span className="city-zip-label">
                <label className="city-label">City</label>
                <label>ZIP Code</label>
              </span>
              <span>
                <input className="city-input" type="text" />
                <input className="zip-code-input" type="text" />
              </span>
            </div>
            <button className="use-address-button">Use this address</button>
          </form>
        </div>
      </div>
    </div>
  );
}
