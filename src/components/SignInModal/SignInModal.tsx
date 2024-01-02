import triangle from "@src/assets/triangle.png";

export function SignInModal() {
  return (
    <>
      <div className="sign-in-bar"></div>
      <img
        className="sign-in-triangle"
        src={triangle}
        alt="Small White Triangle"
      />
    </>
  );
}
