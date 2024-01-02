import React, { useContext } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";
import personLogo from "@src/assets/person-logo.png";

export function Sidebar() {
  const { sideBar } = useContext(GlobalContext);

  return (
    <div>
      {sideBar && (
        <aside className="sidebar">
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
      )}
      <div className="sidebar-modal"></div>
    </div>
  );
}
