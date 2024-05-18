import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { LocaleContext } from "@src/providers/LocaleProvider/LocaleContext";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "@src/providers/AuthProvider";
import { FormattedMessage } from "react-intl";

import { Locale_Enum } from "@src/providers/LocaleProvider/LocaleContext";
import { TAuthorizationStatus_Enum } from "@src/providers/AuthProvider/AuthContext";

import personLogo from "@src/assets/person-logo.png";
import closeSidebar from "@src/assets/sidebar-close-button.png";
import sidebarArrow from "@src/assets/sidebar-arrow.png";
import usaFlag from "@src/assets/usa-flag.jpg";
import webLogo from "@src/assets/web-logo.png";

import axios from "axios";

import "./Sidebar.scss";

interface TCategories {
  id: string;
  created_at?: string;
  updated_at: string;
  name: string;
}

export function Sidebar() {
  const {
    sideBar,
    setSideBar,
    modal,
    setModal,
    currentCategory,
    setCurrentCategory,
  } = useContext(GlobalContext);

  const { authStatus, signOut } = useAuthProvider();

  const { toggleLocale } = useContext(LocaleContext);

  const currentLanguage = localStorage.getItem("language");
  const storedFirstName = localStorage.getItem("firstName");

  const navigate = useNavigate();

  const [categories, setCategories] = useState<TCategories[]>([]);

  async function getCategories() {
    try {
      const response = await axios.get(
        "http://localhost:3000/product-category"
      );
      setCategories(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    localStorage.setItem("current category", JSON.stringify(currentCategory));
  }, [currentCategory]);

  return (
    <>
      {sideBar && (
        <div>
          <>
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
                  <h2>
                    <FormattedMessage id="hello" />,{" "}
                    {authStatus === TAuthorizationStatus_Enum.AUTHORIZED ? (
                      <>{storedFirstName}</>
                    ) : (
                      <>
                        <FormattedMessage id="sign in" />
                      </>
                    )}
                  </h2>
                </div>
              </button>
              <>
                {categories.map((category) => {
                  return (
                    <div
                      key={category.id}
                      onClick={() => {
                        navigate("/products");
                        setCurrentCategory(category.name);
                        setSideBar(false);
                        window.location.reload();
                      }}
                      className="sidebar-categories"
                    >
                      <nav>
                        <FormattedMessage id={category.name} />
                      </nav>
                      <img src={sidebarArrow} alt="Sidebar Arrow" />
                    </div>
                  );
                })}
                <div className="help-settings">
                  <FormattedMessage id="help" /> &{" "}
                  <FormattedMessage id="settings" />
                </div>
                <nav className="your-account">
                  <FormattedMessage id="your account" />
                </nav>
                <span
                  onClick={() => {
                    toggleLocale();
                  }}
                  className="sidebar-language"
                >
                  <img className="web-logo" src={webLogo} alt="Web Logo" />
                  <span>
                    {currentLanguage === Locale_Enum.DE ? "Deutsch" : "English"}
                  </span>
                </span>
                <span className="sidebar-country">
                  <img
                    className="sidebar-usa-flag"
                    src={usaFlag}
                    alt="USA Flag"
                  />
                  <span>
                    <FormattedMessage id="united states" />
                  </span>
                </span>
                {authStatus === TAuthorizationStatus_Enum.AUTHORIZED ? (
                  <>
                    <nav
                      onClick={() => {
                        navigate("sign-in");
                        setSideBar(false);
                        signOut();
                      }}
                      className="sidebar-second-sign-in"
                    >
                      Sign out
                    </nav>
                  </>
                ) : (
                  <>
                    <nav
                      onClick={() => {
                        navigate("sign-in");
                        setSideBar(false);
                      }}
                      className="sidebar-second-sign-in"
                    >
                      <FormattedMessage id="sign in" />
                    </nav>
                  </>
                )}
              </>
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
          </>
          <img
            onClick={() => {
              setModal(false);
              setTimeout(() => {
                setSideBar(false);
              }, 400);
            }}
            className="sidebar-close-button"
            src={closeSidebar}
            alt="Sidebar Close Button"
          />
        </div>
      )}
    </>
  );
}
