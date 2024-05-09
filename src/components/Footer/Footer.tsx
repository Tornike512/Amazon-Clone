import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "@src/providers/AuthProvider";
import { TAuthorizationStatus_Enum } from "@src/providers/AuthProvider/AuthContext";
import { FormattedMessage, useIntl } from "react-intl";

import amazonWhiteLogo from "@src/assets/amazon-logo.png";
import browserIcon from "@src/assets/browser-icon.png";
import usaFlag from "@src/assets/usa-flag.jpg";

import "./Footer.scss";

export function Footer() {
  const { authStatus } = useAuthProvider();

  const navigate = useNavigate();

  const { formatMessage } = useIntl();

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePageReload = () => {
    window.location.reload();
  };

  return (
    <footer className="footer">
      {authStatus === TAuthorizationStatus_Enum.UNAUTHORIZED && (
        <ul className="footer-sign-in">
          <li>
            <FormattedMessage id="see personalized recommendations" />
          </li>
          <button
            onClick={() => {
              navigate("/sign-in");
            }}
            className="footer-sign-in-button"
          >
            <FormattedMessage id="sign in" />
          </button>
          <li className="new-customer">
            <FormattedMessage id="new customer" />?{" "}
            <a onClick={() => navigate("/register")}>
              <FormattedMessage id="start here" />.
            </a>
          </li>
        </ul>
      )}
      <ul onClick={handleScrollUp} className="back-to-top">
        <li>
          <FormattedMessage id="back to top" />
        </li>
      </ul>
      <div className="footer-main-grid-container">
        <ul className="footer-main-grid">
          <li className="footer-grid-item">
            <h4>
              <FormattedMessage id="get to know us" />
            </h4>
            <a href="#">
              <FormattedMessage id="careers" />
            </a>
            <a href="#">
              <FormattedMessage id="blog" />
            </a>
            <a href="#">
              <FormattedMessage id="about amazon" />
            </a>
            <a href="#">
              <FormattedMessage id="investor relations" />
            </a>
            <a href="#">
              <FormattedMessage id="amazon devices" />
            </a>
            <a href="#">
              <FormattedMessage id="amazon science" />
            </a>
          </li>
          <li className="footer-grid-item">
            <h4>
              <FormattedMessage id="make money with us" />
            </h4>
            <a href="#">
              <FormattedMessage id="sell products on amazon" />
            </a>
            <a href="#">
              <FormattedMessage id="sell on amazon business" />
            </a>
            <a href="#">
              <FormattedMessage id="sell apps on amazon" />
            </a>
            <a href="#">
              <FormattedMessage id="become an affiliate" />
            </a>
            <a href="#">
              <FormattedMessage id="advertise your products" />
            </a>
            <a href="#">
              <FormattedMessage id="self publish with us" />
            </a>
            <a href="#">
              <FormattedMessage id="host on amazon hub" />
            </a>
            <a href="#">
              <FormattedMessage id="see more make money with us" />
            </a>
          </li>
          <li className="footer-grid-item">
            <h4>
              <FormattedMessage id="amazon payment products" />
            </h4>
            <a href="#">
              <FormattedMessage id="amazon business card" />
            </a>
            <a href="#">
              <FormattedMessage id="shop with points" />
            </a>
            <a href="#">
              <FormattedMessage id="reload your balance" />
            </a>
            <a href="#">
              <FormattedMessage id="amazon currency converter" />
            </a>
          </li>
          <li className="footer-grid-item">
            <h4>
              <FormattedMessage id="let us help you" />
            </h4>
            <a href="#">
              <FormattedMessage id="amazon and covid-19" />
            </a>
            <a href="#">
              <FormattedMessage id="your account" />
            </a>
            <a href="#">
              <FormattedMessage id="your orders" />
            </a>
            <a href="#">
              <FormattedMessage id="shipping rated & policies" />
            </a>
            <a href="#">
              <FormattedMessage id="returns & replacements" />
            </a>
            <a href="#">
              <FormattedMessage id="manage your content and devices" />
            </a>
            <a href="#">
              <FormattedMessage id="amazon assistant" />
            </a>
            <a href="#">
              <FormattedMessage id="help" />
            </a>
          </li>
        </ul>
      </div>
      <div className="amazon-currency-container">
        <div className="amazon-currency">
          <img
            onClick={handlePageReload}
            src={amazonWhiteLogo}
            alt="Amazon Logo"
          />
          <ul>
            <li>
              <img src={browserIcon} alt="Broweser Icon" />
              <p>
                <FormattedMessage id="english" />
              </p>
            </li>
            <li>$ USD - U. S. Dollar</li>
            <li>
              <img src={usaFlag} alt="Usa Flag" />
              <p>
                <FormattedMessage id="united states" />
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-secondary-grid-container">
        <ul className="footer-secondary-grid">
          <li className="footer-secondary-grid-item">
            <h6>
              <FormattedMessage id="amazon music" />
            </h6>
            <p>
              <FormattedMessage id="stream millions of songs" />
            </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>
              <FormattedMessage id="amazon ads" />
            </h6>
            <p>
              <FormattedMessage id="reach customers wherever they spend their time" />
            </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>6pm</h6>
            <p>
              <FormattedMessage id="score deals on fashion brands" />
            </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>
              <FormattedMessage id="abebooks" />
            </h6>
            <p>
              <FormattedMessage id="books, art & collectibles" />
            </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>
              <FormattedMessage id="acx" />
            </h6>
            <p>
              <FormattedMessage id="audiobook publishing made easy" />
            </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>
              <FormattedMessage id="sell on amazon" />
            </h6>
            <p>
              <FormattedMessage id="start a selling account" />
            </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>
              <FormattedMessage id="amazon business" />
            </h6>
            <p>
              <FormattedMessage id="everything for your business" />
            </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>
              <FormattedMessage id="amazonglobal" />
            </h6>
            <p>
              <FormattedMessage id="ship orders internationally" />
            </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>
              <FormattedMessage id="home services" />
            </h6>
            <p>
              <FormattedMessage id="experienced pros happiness guarantee" />
            </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>
              <FormattedMessage id="amazon web services" />
            </h6>
            <p>
              <FormattedMessage id="scalable cloud computing services" />
            </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>
              <FormattedMessage id="audible" />
            </h6>
            <p>
              <FormattedMessage id="listen to books & original audio performances" />
            </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>
              <FormattedMessage id="box office mojo" />
            </h6>
            <p>
              <FormattedMessage id="find movie box office data" />
            </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>
              <FormattedMessage id="goodreads" />
            </h6>
            <p>
              <FormattedMessage id="book reviews & recommendations" />
            </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>IMDb</h6>
            <p>
              <FormattedMessage id="movies, tv & celebrities" />
            </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>IMDbPro</h6>
            <p>
              <FormattedMessage id="get info entertainment professionals need" />
            </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>
              <FormattedMessage id="kindle direct publishing" />
            </h6>
            <p>
              <FormattedMessage id="kindie digital & print bublishing made easy" />
            </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>
              <FormattedMessage id="prime video direct" />
            </h6>
            <p>
              <FormattedMessage id="video distribution made easy" />{" "}
            </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>
              <FormattedMessage id="shopbop" />
            </h6>
            <p>
              <FormattedMessage id="designer fashion brands" />
            </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>Woot!</h6>
            <p>
              <FormattedMessage id="deals and shenanigans" />
            </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>Zappos</h6>
            <p>
              <FormattedMessage id="shoes & clothing" />
            </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>
              <FormattedMessage id="ring" />
            </h6>
            <p>
              <FormattedMessage id="smart home security systems" />
            </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>eero WiFi</h6>
            <p>
              <FormattedMessage id="stream 4k video in every room" />
            </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>
              <FormattedMessage id="blink" />
            </h6>
            <p>
              <FormattedMessage id="smart security for every home" />
            </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>
              <FormattedMessage id="neightbors app" />
            </h6>
            <p>
              <FormattedMessage id="real-time crime & safety alerts" />
            </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>
              <FormattedMessage id="amazon subscription boxes" />
            </h6>
            <p>
              <FormattedMessage id="top subscription boxes - right to your door" />
            </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>PillPack</h6>
            <p>
              <FormattedMessage id="pharmacy simplified" />
            </p>
          </li>
        </ul>
      </div>
      <ul className="footer-conditons-of-use">
        <li>
          <FormattedMessage id="conditions of use" />
        </li>
        <li>
          <FormattedMessage id="privacy notice" />
        </li>
        <li>
          <FormattedMessage id="consumer health data privacy disclosure" />
        </li>
        <li>
          <FormattedMessage id="your ads privacy choices" />
        </li>
      </ul>
      <nav className="made-by">
        <p>
          <FormattedMessage id="made by" />
        </p>
        <a target="blank" href="https://github.com/Tornike512/Amazon-Clone">
          @Tornike Tsagareishvili
        </a>
      </nav>
    </footer>
  );
}
