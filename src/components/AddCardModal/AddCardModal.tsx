import blackCloseIcon from "@src/assets/black-close-icon.png";

import "./AddCardModal.scss";

export function AddCardModal() {
  return (
    <div className="add-card-modal">
      <div className="add-card">
        <div className="card-modal-header">
          <span>Add a credit or debit card</span>
          <button className="close-modal">
            <img src={blackCloseIcon} alt="Close Image" />
          </button>
        </div>
        <div className="add-card-details">
          <div className="card-details">
            <span className="card-number">
              <label>Card number</label>
              <input />
            </span>
            <span className="name-on-card">
              <label>Name on card</label>
              <input />
            </span>
            <span className="expiration-date">
              <label>Expiration date</label>
              <select className="select-month" id="months">
                <option value="1">1</option>
              </select>
              <select className="select-year" id="years">
                <option value="2024">2024</option>
              </select>
            </span>
          </div>
          <div className="acceoted-cards">
            <p>Amazon accepts all major credit and debit cards:</p>
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
          </div>
        </div>
        <span className="cancel-or-add">
          <button className="cancel-button">Cancel</button>
          <button className="add-card-button">Add your card</button>
        </span>
      </div>
    </div>
  );
}
