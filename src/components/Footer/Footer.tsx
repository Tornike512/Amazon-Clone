import amazonWhiteLogo from "@src/assets/amazon-logo.png";
import browserIcon from "@src/assets/browser-icon.png";
import usaFlag from "@src/assets/usa-flag.jpg";

import "./Footer.scss";

export function Footer() {
  return (
    <footer className="footer">
      <ul className="footer-sign-in">
        <li>See personalized recommendations</li>
        <button className="footer-sign-in-button">Sign in</button>
        <li className="new-customer">
          New customer? <a href="#">Start here.</a>
        </li>
      </ul>
      <ul className="back-to-top">
        <li>Back to top</li>
      </ul>
      <div className="footer-main-grid-container">
        <ul className="footer-main-grid">
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
      <div className="amazon-currency-container">
        <div className="amazon-currency">
          <img src={amazonWhiteLogo} alt="Amazon Logo" />
          <ul>
            <li>
              <img src={browserIcon} alt="Broweser Icon" />
              <p>English</p>
            </li>
            <li>$ USD - U. S. Dollar</li>
            <li>
              <img src={usaFlag} alt="Usa Flag" />
              <p>United States</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-secondary-grid-container">
        <ul className="footer-secondary-grid">
          <li className="footer-secondary-grid-item">
            <h6>Amazon Music</h6>
            <p>Stream millions of songs</p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>Amazon Ads</h6>
            <p>Reach customers wherever they spend their time</p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>6pm</h6>
            <p>Score deals on fashion brands</p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>AbeBooks</h6>
            <p>Books, art & collectibles</p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>ACX</h6>
            <p>Audiobook Publishing Made Easy</p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>Sell on Amazon</h6>
            <p>Start a Selling Account</p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>Amazon Business</h6>
            <p>Everything For Your Business</p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>AmazonGlobal</h6>
            <p>Ship Orders Internationally</p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>Home Services</h6>
            <p>Experienced Pros Happiness Guarantee</p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>Amazon Web Services</h6>
            <p>Scalable Cloud Computing Services</p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>Audible</h6>
            <p>Listen to Books & Original Audio Performances </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>Box Office Mojo</h6>
            <p>Find Movie Box Office Data</p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>Goodreads</h6>
            <p>Book reviews & recommendations</p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>IMDb</h6>
            <p>Movies, TV & Celebrities</p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>IMDbPro</h6>
            <p>Get Info Entertainment Professionals Need </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>Kindle Direct Publishing</h6>
            <p>Indie Digital & Print Publishing Made Easy </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>Prime Video Direct</h6>
            <p>Video Distribution Made Easy </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>Shopbop</h6>
            <p>Designer Fashion Brands</p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>Woot!</h6>
            <p>Deals and Shenanigans</p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>Zappos</h6>
            <p>Shoes & Clothing</p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>Ring</h6>
            <p>Smart Home Security Systems</p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>eero WiFi</h6>
            <p>Stream 4K Video in Every Room</p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>Blink</h6>
            <p>Smart Security for Every Home</p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>Neighbors App</h6>
            <p>Real-Time Crime & Safety Alerts </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>Amazon Subscription Boxes</h6>
            <p>Top subscription boxes - right to your door </p>
          </li>
          <li className="footer-secondary-grid-item">
            <h6>PillPack</h6>
            <p>Pharmacy Simplified</p>
          </li>
        </ul>
      </div>
      <ul className="footer-conditons-of-use">
        <li>Conditions of Use</li>
        <li>Privacy Notice</li>
        <li>Consumer Health Data Privacy Disclosure</li>
        <li>Your Ads Privacy Choices</li>
      </ul>
      <ul className="made-by">
        <li>Made By </li>
        <li>@Tornike Tsagareishvili</li>
      </ul>
    </footer>
  );
}
