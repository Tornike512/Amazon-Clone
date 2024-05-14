import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";
import exclamationPoint from "@src/assets/exclamation-point-logo.png";

import { v4 as uuidv4 } from "uuid";

import dates from "./date.json";

import blackCloseIcon from "@src/assets/black-close-icon.png";
import supportedCards from "@src/assets/supported-cards.png";

import "./AddCardModal.scss";

export function AddCardModal({ closeModal }: { closeModal: () => void }) {
  const [cardNumber, setCardNumber] = useState<string>("");
  const [nameOnCard, setNameOnCard] = useState<string>("");
  const [months, setMonths] = useState<string>("");
  const [years, setYears] = useState<string>("");

  const { cards, setCards } = useContext(GlobalContext);

  function addCards() {
    if (
      cardNumber !== "" ||
      nameOnCard !== "" ||
      months !== "" ||
      years !== ""
    ) {
      setCards((card) => [
        ...card,
        {
          id: uuidv4(),
          select: false,
          cardNumber: cardNumber,
          nameOnCard: nameOnCard,
          months: months,
          years: years,
        },
      ]);
      closeModal();
    }
  }

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
              <input onChange={(e) => setCardNumber(e.target.value)} />
            </span>
            <p className="warning">
              <img src={exclamationPoint} alt="Exclamation Point" />
              Please enter card number
            </p>
            <span className="name-on-card">
              <label>Name on card</label>
              <input onChange={(e) => setNameOnCard(e.target.value)} />
            </span>
            <p className="warning">
              <img src={exclamationPoint} alt="Exclamation Point" />
              Please enter your name
            </p>
            <span className="expiration-date">
              <label>Expiration date</label>
              <select
                onChange={(e) => setMonths(e.target.value)}
                className="select-month"
                id="months"
              >
                {dates.months.map((month) => {
                  return <option key={month.id}>{month.name}</option>;
                })}
              </select>
              <select
                onChange={(e) => setYears(e.target.value)}
                className="select-year"
                id="years"
              >
                {dates.years.map((year) => {
                  return <option key={year.id}>{year.value}</option>;
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
          <button
            onClick={() => {
              addCards();
            }}
            className="add-card-button"
          >
            Add your card
          </button>
        </span>
      </div>
      <div onClick={closeModal} className="modal-background"></div>
    </div>
  );
}
