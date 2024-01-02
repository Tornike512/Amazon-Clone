import { useContext, useState } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";
import personLogo from "@src/assets/person-logo.png";

export function Sidebar() {
  const { sideBar, setSideBar, modal, setModal } = useContext(GlobalContext);

  console.log(sideBar, "sidebar");

  return (
    <>
      {sideBar && (
        <div>
          <aside className={modal ? "sidebar" : "sidebar-close"}>
            <button className="sidebar-sign-in">
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
              // You can add a timeout to give some time for the fade-out animation
              setTimeout(() => {
                setSideBar(false); // Assuming you want to close the sidebar as well
              }, 400); // 400ms is the duration of your animation
            }}
          ></div>
        </div>
      )}
    </>
  );
}
