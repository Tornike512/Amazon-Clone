import "./Footer.scss";

export function Footer() {
  return (
    <footer className="footer">
      <ul className="footer-sign-in">
        <li>See personalized recommendations</li>
        <button className="footer-sign-in">Sign in</button>
        <li className="new-customer">
          New customer? <a href="#">Start here.</a>
        </li>
      </ul>
      <ul className="back-to-top">
        <li>Back to top</li>
      </ul>
      <div className="footer-main-grid-container">
        <ul className="footer-=main-grid">
          <li className="footer-grid-item">
            <h4>Get to Know Us</h4>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
            <a href="#">About Amazon</a>
            <a href="#">Investor Relations</a>
            <a href="#">Amazon Devices</a>
            <a href="#">Amazon Science</a>
          </li>
          <li className="footer-grid-item">
            <h4>Make Money with Us</h4>
            <a href="#">Sell products on Amazon</a>
            <a href="#">Sell on Amazon Business</a>
            <a href="#">Sell apps on Amazon</a>
            <a href="#">Become an Affiliate</a>
            <a href="#">Advertise Your Products</a>
            <a href="#">Self-Publish with Us</a>
            <a href="#">Host an Amazon Hub</a>
            <a href="#">See More Make Money with Us</a>
          </li>
          <li className="footer-grid-item">
            <h4>Amazon Payment Products</h4>
            <a href="#">Amazon Business Card</a>
            <a href="#">Shop with Points</a>
            <a href="#">Reload Your Balance</a>
            <a href="#">Amazon Currency Converter</a>
          </li>
          <li className="footer-grid-item">
            <h4>Let Us Help You</h4>
            <a href="#">Amazon and COVID-19</a>
            <a href="#">Your Account</a>
            <a href="#">Your Orders</a>
            <a href="#">Shipping Rates & Policies</a>
            <a href="#">Returns & Replacements</a>
            <a href="#">Manage Your Content and Devices</a>
            <a href="#">Amazon Assistant</a>
            <a href="#">Help</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
