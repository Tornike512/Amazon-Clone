import { useContext } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { useNavigate } from "react-router-dom";

import personLogo from "@src/assets/person-logo.png";

import "./Sidebar.scss";

export function Sidebar() {
  const { sideBar, setSideBar, modal, setModal } = useContext(GlobalContext);

  const navigate = useNavigate();

  return (
    <>
      {sideBar && (
        <div>
          <aside className={modal ? "sidebar" : "sidebar-close"}>
            <button
              onClick={() => {
                navigate("/sign-in");
                setSideBar(false);
              }}
              className="sidebar-sign-in"
            >
              <div className="sign-in-text">
                <img src={personLogo} alt="Person logo" />
                <h2>Hello, sign in</h2>
              </div>
            </button>
            <section>
              <nav></nav>
            </section>
          </aside>

          <div
            className={modal ? "sidebar-modal" : "sidebar-modal-close"}
            onClick={() => {
              setModal(false);

              setTimeout(() => {
                setSideBar(false);
              }, 400);
            }}
          ></div>
        </div>
      )}
    </>
  );
}
