import { useState } from "react";

import dates from "./date.json";

import blackCloseIcon from "@src/assets/black-close-icon.png";
import supportedCards from "@src/assets/supported-cards.png";

import "./AddCardModal.scss";

export function AddCardModal({ closeModal }: { closeModal: () => void }) {
  return (
    <div className="add-card-modal">
      <div className="add-card">
        <div className="card-modal-header">
          <span>Add a credit or debit card</span>
          <button onClick={closeModal} className="close-modal">
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
                {dates.months.map((month) => {
                  return <option value={month}>{month}</option>;
                })}
              </select>
              <select className="select-year" id="years">
                {dates.years.map((year) => {
                  return <option value={year}>{year}</option>;
                })}
              </select>
            </span>
          </div>
          <div className="accepted-cards">
            <p>Amazon accepts all major credit and debit cards:</p>
            <img src={supportedCards} alt="Supported Cardss" />
          </div>
        </div>
        <span className="cancel-or-add">
          <button onClick={closeModal} className="cancel-button">
            Cancel
          </button>
          <button className="add-card-button">Add your card</button>
        </span>
      </div>
      <div onClick={closeModal} className="modal-background"></div>
    </div>
  );
}
