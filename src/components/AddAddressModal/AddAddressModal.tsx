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
        <h1 className="add-address-text">Add a new address</h1>
        <label>Full name (First and Last name)</label>
        <input className="full-name-input" type="text" />
        <label>Phone number</label>
        <input className="phone-number-input" type="text" />
        <label>Address</label>
        <input
          className="address-input"
          type="text"
          placeholder="Street address or P.O. Box"
        />
        <span>
          <label>City</label>
          <label>ZIP Code</label>
        </span>
        <form>
          <input className="city-input" type="text" />
          <input className="zip-code-input" type="text" />
        </form>
        <button className="use-address-button">Use this address</button>
      </div>
    </div>
  );
}
