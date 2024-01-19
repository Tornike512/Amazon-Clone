import { useNavigate } from "react-router-dom";
import { useState } from "react";
import amazonLogoBlack from "@src/assets/amazon-logo-black.png";
import "src/views/RegisterPage/RegisterPage.scss";

export function RegisterPage() {
  const navigate = useNavigate();

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
            </div>
            <div>
              <label className="enter-info-text">Mobile number or email</label>
              <div className="register-input-value">
                <input className="enter-text" type="text" />
              </div>
            </div>
            <div>
              <label className="enter-info-text">Password</label>
              <div className="register-input-value">
                <input
                  className="enter-text"
                  type="password"
                  placeholder="At least 6 characters"
                />
              </div>
            </div>
            <div>
              <label className="enter-info-text">Re-enter password</label>
              <div className="register-input-value">
                <input className="enter-text" type="password" />
                <button>Continue</button>
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
