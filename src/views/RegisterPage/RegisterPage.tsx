import { useNavigate } from "react-router-dom";
import amazonLogoBlack from "@src/assets/amazon-logo-black.png";
import "src/views/RegisterPage/RegisterPage.scss";

export function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div className="register-page">
      <div className="image-spacing">
        <img
          onClick={() => navigate("/")}
          src={amazonLogoBlack}
          alt="Black Amazon Logo"
        />
      </div>
    </div>
  );
}
