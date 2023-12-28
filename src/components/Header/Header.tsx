import navIcon from "@src/assets/nav-icon.png";

export function Header() {
  return (
    <header>
      <div className="header-input"></div>
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
