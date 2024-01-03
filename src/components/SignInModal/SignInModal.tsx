import { useContext } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";

export function SignInModal() {
  const { signInHover } = useContext(GlobalContext);

  return (
    <>
      {signInHover && (
        <div className="sign-in-bar">
          <span className="button-space">
            <button className="sign-in-button">Sign in</button>
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
      )}
    </>
  );
}
