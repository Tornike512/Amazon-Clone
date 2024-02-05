import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { useNavigate } from "react-router-dom";
import { LocaleContext } from "@src/providers/LocaleProvider";
import { FormattedMessage } from "react-intl";
import { useAuthProvider } from "@src/providers/AuthProvider";
import { TAuthorizationStatus_Enum } from "@src/providers/AuthProvider/AuthContext";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@src/config/LocalStorageKeys";

import navIcon from "@src/assets/nav-icon.png";
import amazonLogo from "@src/assets/amazon-logo.png";
import locationLogo from "@src/assets/location-logo.png";
import searchicon from "@src/assets/search-icon.png";
import usaFlag from "@src/assets/usa-flag.jpg";
import dropDownIcon from "src/assets/dropdown-icon.png";
import cartLogo from "@src/assets/cart-logo.png";
import triangle from "@src/assets/triangle.png";

import "./Header.scss";

export function Header() {
  const navigate = useNavigate();

  const {
    setSideBar,
    setModal,
    setSignInHover,
    signInHover,
    setLanguageHover,
    languageHover,
    nameInput,
  } = useContext(GlobalContext);

  const { toggleLocale } = useContext(LocaleContext);

  const { authStatus } = useAuthProvider();
  console.log(nameInput);

  const [firstName, setFirstName] = useState<string>("");

  const storedFirstName = localStorage.getItem("firstName") || "";

  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  return (
    <header className="header">
      {signInHover && (
        <img
          className="sign-in-triangle"
          src={triangle}
          alt="Small White Triangle"
        />
      )}
      <div className="header-input">
        <div className="logo-spacing">
          <img className="amazon-logo" src={amazonLogo} alt="Amazon logo" />
          <div className="deliver-spacing">
            <img
              className="location-logo"
              src={locationLogo}
              alt="Location logo"
            />
            <button className="deliver">
              <div>
                <span className="deliver-to">Deliver to</span>
                <span className="uk">United Kingdom</span>
              </div>
            </button>
          </div>
        </div>
        <div className="search-bar">
          <div className="input-spacing">
            <select name="all" className="select-niche">
              all
              <option value="/">All</option>
              <option value="/">Computers</option>
              <option value="/">Kitchen</option>
              <option value="/">Books</option>
            </select>
            <input
              type="text"
              placeholder="Search Amazon"
              className="search-amazon"
            />
          </div>
          <button className="search-button">
            <img src={searchicon} alt="Search Icon" />
          </button>
        </div>
        <nav className="amazon-tools">
          <div
            onMouseOver={() => {
              setLanguageHover(true);
            }}
            onMouseLeave={() => setLanguageHover(false)}
            className="change-language"
          >
            <img src={usaFlag} alt="US Flag" />
            <span>EN</span>
            <img className="dropdown" src={dropDownIcon} alt="Dropdown Icon" />
          </div>
          <a
            onClick={() => {
              navigate("/sign-in");
              setSignInHover(false);
            }}
            onMouseOver={() => setSignInHover(true)}
            onMouseLeave={() => setSignInHover(false)}
            className="sign-in"
          >
            <div className="sign-in-spacing">
              <span className="sign-in-text">
                Hello,
                {authStatus === TAuthorizationStatus_Enum.AUTHORIZED ? (
                  <span>{nameInput}</span>
                ) : (
                  <span>Sign in</span>
                )}
              </span>
              <p className="account-list">
                <b>Account & Lists</b>
              </p>
            </div>
            <img
              className="sign-in-dropdown"
              src={dropDownIcon}
              alt="sign in dropdown icon"
            />
          </a>
          <div onClick={() => navigate("/sign-in")} className="returns-orders">
            <span>Returns</span>
            <p>& Orders</p>
          </div>
          <div className="cart">
            <div className="cart-count">
              <span>0</span>
              <img src={cartLogo} alt="Cart Logo" />
            </div>
            <span className="cart-text">Cart</span>
          </div>
        </nav>
      </div>
      <nav className="nav-bar">
        <button
          className="open-sidebar"
          onClick={() => {
            setSideBar(true);
            setModal(true);
          }}
        >
          <img src={navIcon} alt="nav icon" /> All
        </button>

        <a href="#">Today's Deals</a>
        <a href="#">Customer Service</a>
        <a href="#">Registry</a>
        <a href="#">Gift Cards</a>
        <a href="#">Sell</a>
      </nav>
      {signInHover && <div className="sign-in-modal-mouseover"></div>}
      {!signInHover && <div className="sign-in-modal-mouseout"></div>}
    </header>
  );
}
