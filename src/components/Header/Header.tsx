import navIcon from "@src/assets/nav-icon.png";
import amazonLogo from "@src/assets/amazon-logo.png";
import locationLogo from "@src/assets/location-logo.png";
import searchicon from "@src/assets/search-icon.png";
import usaFlag from "@src/assets/usa-flag.webp";
import dropDownIcon from "src/assets/dropdown-icon.png";

export function Header() {
  return (
    <header className="header">
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
        <div className="search-bar">
          <select name="all" className="select-niche">
            all
            <option value="/">All</option>
            <option value="/">Computers</option>
            <option value="/">Kitchen</option>
            <option value="/">Books</option>
          </select>
          <form>
            <input
              type="text"
              placeholder="Search Amazon"
              className="search-amazon"
            />
          </form>
          <button className="search-button">
            <img src={searchicon} alt="Search Icon" />
          </button>
        </div>
        <div className="amazon-tools">
          <div className="change-language">
            <img src={usaFlag} alt="US Flag" />
            <h3>EN</h3>
            <img className="dropdown" src={dropDownIcon} alt="Dropdown Icon" />
          </div>
          <div className="sign-in">
            <div className="sign-in-spacing">
              <h4>Hello,sign in</h4>
              <h3>Account & Lists</h3>
            </div>
            <img
              className="sign-in-dropdown"
              src={dropDownIcon}
              alt="sign in dropdown icon"
            />
          </div>
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
