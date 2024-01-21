import { useNavigate } from "react-router-dom";
import { useState } from "react";

import amazonLogoBlack from "@src/assets/amazon-logo-black.png";
import exclamationIcon from "@src/assets/exclamation-point-logo.png";

import "@src/views/SignInPage/SignInPage.scss";
export function SignInPage() {
  const navigate = useNavigate();

  const [warning, setWarning] = useState<boolean>(false);
  const [signInInput, setSignInInput] = useState<string>("");
  const [enterPassword, setEnterPassword] = useState<boolean>("");

  return (
    <div className="sign-in-page">
      <div className="image-spacing">
        <img
          onClick={() => navigate("/")}
          src={amazonLogoBlack}
          alt="Black Amazon Logo"
        />
      </div>

      <div className="sign-in-spacing">
        <div className="sign-in-box">
          <h1>Sign in</h1>
          {!enterPassword ? (
            <>
              <label className="enter-info-text">
                Email or mobile phone number
              </label>
              <div className="enter-email">
                <input
                  onChange={(e) => {
                    setWarning(false);
                    setSignInInput(e.target.value);
                  }}
                  className={
                    warning && signInInput === ""
                      ? "input-warning-border"
                      : "enter-text"
                  }
                  type="email"
                />

                {warning && signInInput === "" && (
                  <span className="sign-in-input-warning">
                    <img src={exclamationIcon} alt="Exclamation Point Icon" />
                    <p>Enter your email or mobile phone number</p>
                  </span>
                )}
                <button
                  onClick={() => {
                    setWarning(true);
                    setEnterPassword(true);
                  }}
                >
                  Continue
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="email-or-number">
                asfas <a className="change-account">Change</a>
              </div>
              <label className="password-text">Password</label>
              <div>
                <input className="password-input" type="password" />
              </div>
              <button className="sign-in-button">Sign in</button>
            </>
          )}

          <p className="conditions-of-use">
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

      <div className="divider-spacing">
        <div className="new-to-amazon">New to Amazon?</div>
        <div className="divider"></div>
      </div>
      <button
        onClick={() => {
          navigate("/register");
        }}
        className="create-account"
      >
        Create your Amazon account
      </button>
      <div className="sign-in-footer-divider"></div>
      <span className="sign-in-footer-text">
        <a href="#">Conditions of Use</a>
        <a href="#">Privacy Notice</a>
        <a href="#">Help</a>
      </span>
      <span className="copyright-notice">
        © 1996-2024, Amazon.com, Inc. or its affiliates
      </span>
    </div>
  );
}
