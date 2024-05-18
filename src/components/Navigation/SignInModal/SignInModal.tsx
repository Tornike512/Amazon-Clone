import { useContext } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "@src/providers/AuthProvider";
import { FormattedMessage } from "react-intl";

import { TAuthorizationStatus_Enum } from "@src/providers/AuthProvider/AuthContext";
import { Locale_Enum } from "@src/providers/LocaleProvider/LocaleContext";

export function SignInModal() {
  const navigate = useNavigate();

  const { signInHover, setSignInHover } = useContext(GlobalContext);

  const { authStatus, signOut } = useAuthProvider();

  const currentLanguage = localStorage.getItem("language");

  return (
    <>
      {signInHover && (
        <div>
          <div
            onMouseOver={() => setSignInHover(true)}
            onMouseOut={() => setSignInHover(false)}
            className="sign-in-bar"
            style={currentLanguage === Locale_Enum.DE ? { right: "10px" } : {}}
          >
            {authStatus === TAuthorizationStatus_Enum.UNAUTHORIZED && (
              <>
                <span className="button-space">
                  <button
                    onClick={() => {
                      navigate("/sign-in");
                      setSignInHover(false);
                    }}
                    className="sign-in-button"
                  >
                    <FormattedMessage id="sign in" />
                  </button>
                </span>

                <p className="sign-in-bar-register">
                  <FormattedMessage id="new customer" />{" "}
                  <a
                    onClick={() => {
                      navigate("/register");
                      setSignInHover(false);
                    }}
                  >
                    {" "}
                    <FormattedMessage id="start here" />
                  </a>
                </p>
              </>
            )}
            <div className="lists-account">
              <span className="lists">
                <span>
                  <FormattedMessage id="your lists" />
                </span>
                <a
                  onClick={() => {
                    navigate("/wishlist");
                    setSignInHover(false);
                  }}
                >
                  <FormattedMessage id="create a list" />
                </a>
                <a
                  onClick={() => {
                    navigate("/products");
                    setSignInHover(false);
                  }}
                >
                  <FormattedMessage id="find products" />
                </a>
              </span>
              <span className="account">
                <span>
                  <FormattedMessage id="your account" />
                </span>
                <a
                  onClick={() => {
                    navigate("/sign-in");
                    setSignInHover(false);
                  }}
                >
                  <FormattedMessage id="account" />
                </a>
                {authStatus === TAuthorizationStatus_Enum.AUTHORIZED && (
                  <>
                    <a
                      onClick={() => {
                        setSignInHover(false);
                        navigate("/orders");
                      }}
                    >
                      <FormattedMessage id="returns & orders" />
                    </a>
                    <a
                      onClick={() => {
                        navigate("/cart");
                        setSignInHover(false);
                      }}
                    >
                      <FormattedMessage id="cart" />
                    </a>
                    <a
                      onClick={() => {
                        navigate("/sign-in");
                        setSignInHover(false);
                        signOut();
                      }}
                      href="#"
                    >
                      <FormattedMessage id="sign out" />
                    </a>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
