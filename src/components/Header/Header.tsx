import navIcon from "@src/assets/nav-icon.png";
import amazonLogo from "@src/assets/amazon-logo.png";
import locationLogo from "@src/assets/location-logo.png";

export function Header() {
  return (
    <header>
      <div className="header-input">
        <img className="amazon-logo" src={amazonLogo} alt="Amazon logo" />
        <div className="deliver-spacing">
          <img
            className="location-logo"
            src={locationLogo}
            alt="Location logo"
          />
          <button className="deliver">
            <div>
              <h5>Deliver to</h5>
              <h4>
                <b>United Kingdom</b>
              </h4>
            </div>
          </button>
        </div>
      </div>
      <nav className="nav-bar">
        <a href="#">
          <img src={navIcon} alt="nav icon" /> All
        </a>

        <a href="#">Today's Deals</a>
        <a href="#">Registry</a>
        <a href="#">Customer Service</a>
        <a href="#">Gift Cards</a>
        <a href="#">Sell</a>
      </nav>
    </header>
  );
}
