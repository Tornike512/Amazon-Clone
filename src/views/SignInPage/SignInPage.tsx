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
          <span className="enter-info-text">Email or mobile phone number</span>
          <input type="text" />
          <button>Continue</button>
          <p>
            By continuing, you agree to Amazon's{" "}
            <a href="#">Conditions of Use</a>
            and <a href="#">Privacy Notice.</a>
          </p>
          <a href="#">Forgot your password?</a>
          <span>Buying for work?</span>
          <a href="#">Shop on Amazon Business</a>
        </div>
      </div>
    </div>
  );
}
