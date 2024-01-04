import "@src/views/SignInPage/SignInPage.scss";

import amazonLogoBlack from "@src/assets/amazon-logo-black.png";

export function SignInPage() {
  return (
    <div className="sign-in-page">
      <div className="image-spacing">
        <img src={amazonLogoBlack} alt="Black Amazon Logo" />
      </div>
      <div className="sign-in-spacing">
        <div className="sign-in-box">
          <h1>Sign in</h1>
          <label className="enter-info-text">
            Email or mobile phone number
          </label>
          <div className="enter-email">
            <input type="email" />
            <button>Continue</button>
          </div>
          <p className="Condition-of-use">
            By continuing, you agree to Amazon's{" "}
            <a href="#">Conditions of Use </a>
            and <a href="#">Privacy Notice.</a>
          </p>
          <div className="help">
            <a className="forgot-password" href="#">
              Forgot your password?
            </a>
            <span className="buying-for-work">Buying for work?</span>
            <a className="amazon-business" href="#">
              Shop on Amazon Business
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
