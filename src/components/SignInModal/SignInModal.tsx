import triangle from "@src/assets/triangle.png";

export function SignInModal() {
  return (
    <>
      <div className="sign-in-bar">
        <span className="button-space">
          <button className="sign-in-button">Sign in</button>
        </span>
        <p className="sign-in-bar-register">
          New customer? <a href="#"> Start here</a>
        </p>
      </div>
      <img
        className="sign-in-triangle"
        src={triangle}
        alt="Small White Triangle"
      />
    </>
  );
}
