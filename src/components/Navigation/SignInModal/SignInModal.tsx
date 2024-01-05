import { useContext } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { useNavigate } from "react-router-dom";

export function SignInModal() {
  const navigate = useNavigate();

  const { signInHover, setSignInHover } = useContext(GlobalContext);

  return (
    <>
      {signInHover && (
        <div>
          <div
            onMouseOver={() => setSignInHover(true)}
            onMouseOut={() => setSignInHover(false)}
            className="sign-in-bar"
          >
            <span className="button-space">
              <button
                onClick={() => {
                  navigate("/sign-in");
                  setSignInHover(false);
                }}
                className="sign-in-button"
              >
                Sign in
              </button>
            </span>
            <p className="sign-in-bar-register">
              New customer? <a href="#"> Start here</a>
            </p>
            <div className="lists-account">
              <span className="lists">
                <span>Your Lists</span>
                <a href="#">Create a List</a>
              </span>
              <span className="account">
                <span>Your Account</span>
                <a href="#">Account</a>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
