import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { useAuthProvider } from "@src/providers/AuthProvider";
import { PublicAxios } from "@src/utils/PublicAxios";
import { TAuthRequest } from "@src/@types/RequestTypes";
import { TAuthorizationStatus_Enum } from "@src/providers/AuthProvider/AuthContext";
import { useIntl, FormattedMessage } from "react-intl";

import amazonLogoBlack from "@src/assets/amazon-logo-black.png";
import exclamationIcon from "@src/assets/exclamation-point-logo.png";

import "@src/views/SignInPage/SignInPage.scss";

export interface TSignInFormValue {
  email: string;
  password: string;
}

export function SignInPage() {
  const navigate = useNavigate();

  const { formatMessage } = useIntl();

  const { setAuthData, authStatus, setAuthStatus } = useAuthProvider();
  const { emailInput, passwordInput, setEmailInput, setPasswordInput } =
    useContext(GlobalContext);

  const [warning, setWarning] = useState<boolean>(false);
  const [signInInput, setSignInInput] = useState<string>("");
  const [enterPassword, setEnterPassword] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  async function signIn() {
    try {
      const user: TSignInFormValue = {
        email: emailInput,
        password: passwordInput,
      };
      const response = await PublicAxios.post("auth/login", user);
      setAuthData(response.data as TAuthRequest);
      navigate("/");
      console.log(user);
    } catch (error) {
      console.log("Registration failed:", error);
      setLoggedIn(true);
    }
  }

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
          <h1>
            <FormattedMessage id="sign in" />
          </h1>
          {!enterPassword ? (
            <>
              <label className="enter-info-text">
                <FormattedMessage id="email address" />
              </label>
              <div className="enter-email">
                <input
                  onChange={(e) => {
                    setWarning(false);
                    setEmailInput(e.target.value);
                  }}
                  className={
                    warning && emailInput === ""
                      ? "input-warning-border"
                      : "enter-text"
                  }
                  type="email"
                />

                {warning && emailInput === "" && (
                  <span className="sign-in-input-warning">
                    <img src={exclamationIcon} alt="Exclafmation Point Icon" />
                    <p>
                      <FormattedMessage id="enter your email or mobile phone number" />
                    </p>
                  </span>
                )}
                <button
                  onClick={() => {
                    setWarning(true);
                    if (emailInput !== "") {
                      setEnterPassword(true);
                    }
                    if (enterPassword) {
                      signIn();
                    }
                  }}
                >
                  <FormattedMessage id="continue" />
                </button>
              </div>
              <p className="conditions-of-use">
                <FormattedMessage id="By continuing, you agree to amazon's" />{" "}
                <a href="#">
                  <FormattedMessage id="conditions of use" />{" "}
                </a>
                <FormattedMessage id="and" />{" "}
                <a href="#">
                  <FormattedMessage id="privacy notice." />
                </a>
              </p>
              <div className="help">
                <a className="forgot-password" href="#">
                  <FormattedMessage id="forgot your password?" />
                </a>
                <span className="buying-for-work">
                  <FormattedMessage id="buying your work?" />
                </span>
                <a className="amazon-business" href="#">
                  <FormattedMessage id="shop on amazon business" />
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="email-or-number">
                {emailInput}
                <a
                  onClick={() => {
                    setEnterPassword(false);
                    setSignInInput("");
                  }}
                  className="change-account"
                >
                  <FormattedMessage id="change" />
                </a>
              </div>

              <label className="password-text">
                <FormattedMessage id="password" />
              </label>
              <div>
                <input
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="password-input"
                  type="password"
                />
              </div>
              <button className="sign-in-button" onClick={() => signIn()}>
                <FormattedMessage id="sign in" />
              </button>
              {loggedIn && (
                <span className="incorrect-data">
                  <FormattedMessage id="invalid email address or password" />
                </span>
              )}
              <div className="keep-signed-in">
                <input type="checkbox" />
                <p>
                  <FormattedMessage id="keep me signed in." />
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="divider-spacing">
        <div className="new-to-amazon">
          <FormattedMessage id="new to amazon?" />
        </div>
        <div className="divider"></div>
      </div>
      <button
        onClick={() => {
          navigate("/register");
        }}
        className="create-account"
      >
        <FormattedMessage id="create your amazon account" />
      </button>
      <div className="sign-in-footer-divider"></div>
      <span className="sign-in-footer-text">
        <a href="#">
          <FormattedMessage id="conditions of use" />
        </a>
        <a href="#">
          <FormattedMessage id="privacy notice." />
        </a>
        <a href="#">
          <FormattedMessage id="help" />
        </a>
      </span>
      <span className="copyright-notice">
        <FormattedMessage id="© 1996-2024, amazon.com, inc. or its affiliates" />
      </span>
    </div>
  );
}
