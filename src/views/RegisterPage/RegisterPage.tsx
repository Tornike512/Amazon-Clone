import { useNavigate } from "react-router-dom";
import { useState } from "react";

import amazonLogoBlack from "@src/assets/amazon-logo-black.png";
import exclamationIcon from "@src/assets/exclamation-point-logo.png";
import exclamationBlue from "@src/assets/exclamation-blue.png";

import "src/views/RegisterPage/RegisterPage.scss";

export function RegisterPage() {
  const navigate = useNavigate();

  const [nameInput, setNameInput] = useState<string>("");
  const [mobileEmailInput, setMobileEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [againPasswordInput, setAgainPasswordInput] = useState<string>("");

  const [nameWarning, setNameWarning] = useState<boolean>(false);
  const [mobileEmailWarning, setMobileEmailWarning] = useState<boolean>(false);
  const [passwordWarning, setPasswordWarning] = useState<boolean>(false);
  const [againPasswordWarning, setAgainPasswordWarning] =
    useState<boolean>(false);

  return (
    <div className="register-page">
      <div className="image-spacing">
        <img
          onClick={() => navigate("/")}
          src={amazonLogoBlack}
          alt="Black Amazon Logo"
        />
      </div>
      <div className="register-spacing">
        <div className="register-box">
          <div>
            <h1>Create account</h1>
            <label className="enter-info-text">Your name</label>
            <div className="register-input-value">
              <input
                className="enter-text"
                type="text"
                placeholder="First and last name"
              />
              {nameWarning && (
                <span className="name-input-warning">
                  <img src={exclamationIcon} alt="Exclamation Point Icon" />
                  <p>Enter your name</p>
                </span>
              )}
            </div>
            <div>
              <label className="enter-info-text">Mobile number or email</label>
              <div className="register-mobile-email">
                <input className="mobile-email-text" type="text" />
                {mobileEmailWarning && (
                  <span className="mobile-email-input-warning">
                    <img src={exclamationIcon} alt="Exclamation Point Icon" />
                    <p>Enter your email or mobile phone number</p>
                  </span>
                )}
              </div>
            </div>
            <div>
              <label className="enter-info-text">Password</label>
              <div className="password-input-value">
                <input
                  className="password-text"
                  type="password"
                  placeholder="At least 6 characters"
                />
                {passwordWarning ? (
                  <span className="password-input-warning">
                    <img src={exclamationIcon} alt="Exclamation Point Icon" />
                    <p>Enter your email or mobile phone number</p>
                  </span>
                ) : (
                  <span className="password-require">
                    <img
                      src={exclamationBlue}
                      alt="Exclamation Point Blue Icon"
                    />
                    <p>Passwords must be at least 6 characters.</p>
                  </span>
                )}
              </div>
            </div>
            <div>
              <label className="enter-info-text">Re-enter password</label>
              <div className="password-again-input-value">
                <input className="password-again-text" type="password" />
                <button
                  onClick={() => {
                    setNameWarning(true);
                    setMobileEmailWarning(true);
                    setPasswordWarning(true);
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>

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
          <div className="already-account">
            <p>Already have an account?</p>
            <a onClick={() => navigate("/sign-in")}>Sign in ▸</a>
          </div>
        </div>
      </div>
      <div className="register-footer-divider"></div>
      <span className="register-footer-text">
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
