import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { ResponsiveContext } from "@src/providers/ResponsiveProvider";
import { useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { useAuthProvider } from "@src/providers/AuthProvider";
import { useDebounce } from "@src/hooks/useDebounce";
import { useWindowSize } from "@react-hook/window-size";

import { TGetProducts } from "@src/@types/RequestTypes";
import { TAuthorizationStatus_Enum } from "@src/providers/AuthProvider/AuthContext";

import germanyFlag from "@src/assets/germany-flag.png";
import userLogo from "@src/assets/user-logo.png";
import navIcon from "@src/assets/nav-icon.png";
import amazonLogo from "@src/assets/amazon-logo.png";
import locationLogo from "@src/assets/location-logo.png";
import searchicon from "@src/assets/search-icon.png";
import usaFlag from "@src/assets/usa-flag.jpg";
import dropDownIcon from "src/assets/dropdown-icon.png";
import cartLogo from "@src/assets/cart-logo.png";
import triangle from "@src/assets/triangle.png";
import searchIcon from "@src/assets/search-icon.png";

import axios from "axios";

import "./Header.scss";
import { Locale_Enum } from "@src/providers/LocaleProvider/LocaleContext";

interface TCategories {
  id: string;
  created_at?: string;
  updated_at: string;
  name: string;
}

export function Header() {
  const [categories, setCategories] = useState<TCategories[]>([]);
  const [products, setProducts] = useState<TGetProducts[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [selectNiche, setSelectNiche] = useState<string>("");
  const [searchModal, setSearchModal] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const { formatMessage } = useIntl();

  const { responsive587Px, setResponsive587Px } = useContext(ResponsiveContext);

  const [width] = useWindowSize();

  useEffect(() => {
    if (width <= 587) {
      setResponsive587Px(true);
    } else {
      setResponsive587Px(false);
    }
  }, [width]);

  const debounceSearch = useDebounce(searchInput, 500);

  const currentLanguage = localStorage.getItem("language");

  const navigate = useNavigate();

  async function getCategories() {
    try {
      const response = await axios.get(
        "http://localhost:3000/product-category"
      );

      const productResponse = await axios.get(
        `http://localhost:3000/product?pageSize=50`
      );

      const filteredProducts = productResponse.data.products.filter(
        (product: TGetProducts) =>
          product.title.toLowerCase().includes(debounceSearch.toLowerCase())
      );

      setCategories(response.data);
      setProducts(filteredProducts);
    } catch (error) {
      console.log("Error Loading Categories", error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 1000);
    setLoader(false);
  }, []);

  useEffect(() => {
    getCategories();
  }, [debounceSearch]);

  const {
    setSideBar,
    setModal,
    setSignInHover,
    signInHover,
    setLanguageHover,
    setCurrentInfo,
    countCartProducts,
  } = useContext(GlobalContext);

  const { authStatus } = useAuthProvider();

  const storedFirstName = localStorage.getItem("firstName");

  const storedPurchasedItem = JSON.parse(
    localStorage.getItem("purchased item") || "{}"
  );

  return (
    <header className="header">
      {signInHover && (
        <img
          onMouseOver={() => {
            setSignInHover(true);
          }}
          onMouseLeave={() => {
            setSignInHover(false);
          }}
          className="sign-in-triangle"
          src={triangle}
          alt="Small White Triangle"
          style={currentLanguage === Locale_Enum.DE ? { right: "314px" } : {}}
        />
      )}

      <div className="header-input">
        <div className="logo-spacing">
          <img
            onClick={() => navigate("/")}
            className="amazon-logo"
            src={amazonLogo}
            alt="Amazon logo"
          />
          <div className="deliver-spacing">
            <img
              className="location-logo"
              src={locationLogo}
              alt="Location logo"
            />
            <button className="deliver">
              <div>
                <span className="deliver-to">
                  <FormattedMessage id="deliver to" />
                </span>
                <span className="usa">
                  <FormattedMessage id="united states" />
                </span>
              </div>
            </button>
          </div>
        </div>
        <div className="search-bar">
          {searchModal && (
            <div className="search-modal">
              {products?.map((product: TGetProducts) => {
                return (
                  <div
                    onClick={() => {
                      setSearchModal(false);
                      setTimeout(() => {
                        window.location.reload();
                      }, 100);
                      navigate(`/products/${product.id}`);
                    }}
                    key={product.id}
                    className="search-modal-element"
                  >
                    <img src={searchIcon} alt="Search Icon" />
                    <p>{product.title}</p>
                  </div>
                );
              })}
            </div>
          )}
          <div className="input-spacing">
            <select
              onChange={(e) => {
                setSelectNiche(e.target.value);
                localStorage.setItem(
                  "current category",
                  JSON.stringify(e.target.value)
                );
              }}
              name="all"
              className="select-niche"
              value={selectNiche}
              style={
                selectNiche === "Computers"
                  ? { width: "90px" }
                  : selectNiche === "Kitchen"
                  ? { width: "70px" }
                  : selectNiche === "Books"
                  ? { width: "65px" }
                  : selectNiche === "Video Games"
                  ? { width: "104px" }
                  : selectNiche === "Toys & Games"
                  ? { width: "107px" }
                  : undefined
              }
            >
              <option value="/">
                <FormattedMessage id="all" />
              </option>
              {categories.map((category) => {
                return (
                  <option value={category.name} key={category.id}>
                    <FormattedMessage id={category.name} />
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              placeholder={formatMessage({ id: "search amazon" })}
              className="search-amazon"
              onClick={() => {
                setSearchModal(true);
              }}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
          </div>
          <button
            onClick={() => {
              setSearchModal(false);
              navigate("/products");
            }}
            className="search-button"
          >
            <img src={searchicon} alt="Search Icon" />
          </button>
        </div>
        <nav className="amazon-tools">
          <div
            onMouseOver={() => {
              setLanguageHover(true);
              setSearchModal(false);
            }}
            onMouseLeave={() => setLanguageHover(false)}
            className="change-language"
          >
            <img
              src={currentLanguage === Locale_Enum.DE ? germanyFlag : usaFlag}
              alt="US Flag"
            />
            <span>
              <FormattedMessage id="en" />
            </span>
            <img className="dropdown" src={dropDownIcon} alt="Dropdown Icon" />
          </div>
          <a
            onClick={() => {
              if (authStatus === TAuthorizationStatus_Enum.UNAUTHORIZED) {
                navigate("/sign-in");
              }

              setSignInHover(false);
            }}
            onMouseOver={() => {
              if (responsive587Px) {
                setSignInHover(false);
              } else {
                setSignInHover(true);
              }
              setSearchModal(false);
            }}
            onMouseLeave={() => setSignInHover(false)}
            className="sign-in"
          >
            <div className="sign-in-spacing">
              <span className="sign-in-text">
                <FormattedMessage id="hello" />,
                {authStatus === TAuthorizationStatus_Enum.AUTHORIZED ? (
                  <span>{storedFirstName}</span>
                ) : (
                  <span>Sign in</span>
                )}
              </span>
              <p className="account-list">
                {authStatus === TAuthorizationStatus_Enum.AUTHORIZED ? (
                  responsive587Px ? (
                    <>
                      <b>{storedFirstName}</b>
                      <img src={userLogo} alt="sign in dropdown icon" />
                    </>
                  ) : (
                    <b>Account & Lists</b>
                  )
                ) : (
                  <>
                    {!responsive587Px && (
                      <b>
                        <FormattedMessage id="account & lists" />
                      </b>
                    )}
                  </>
                )}
              </p>
            </div>
            {!responsive587Px && (
              <img
                className="sign-in-dropdown"
                src={dropDownIcon}
                alt="sign in dropdown icon"
              />
            )}
          </a>
          <div
            onClick={() => {
              if (authStatus === TAuthorizationStatus_Enum.UNAUTHORIZED) {
                navigate("/sign-in");
              } else {
                navigate("/orders");
                setCurrentInfo("Orders");
              }
            }}
            className="returns-orders"
          >
            <span>
              <FormattedMessage id="returns" />
            </span>
            <p>
              & <FormattedMessage id="orders" />
            </p>
          </div>
          <div
            onClick={() => {
              if (authStatus === TAuthorizationStatus_Enum.AUTHORIZED) {
                navigate("/cart");
              } else {
                navigate("/sign-in");
              }
            }}
            className="cart"
          >
            <div className="cart-count">
              {authStatus === TAuthorizationStatus_Enum.AUTHORIZED ? (
                <>
                  {!loader ? (
                    <>
                      <div className="loading">
                        <div className="loader-spacing">
                          <span className="loader"></span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <span>
                      {countCartProducts -
                        Object.keys(storedPurchasedItem).length <=
                      0 ? (
                        <>0</>
                      ) : (
                        <>
                          {countCartProducts -
                            Object.keys(storedPurchasedItem).length <=
                          9 ? (
                            <>
                              {countCartProducts -
                                Object.keys(storedPurchasedItem).length}
                            </>
                          ) : (
                            <div style={{ margin: "-4px" }}>{`9+`}</div>
                          )}
                        </>
                      )}
                    </span>
                  )}
                </>
              ) : (
                <span>0</span>
              )}
              <img src={cartLogo} alt="Cart Logo" />
            </div>
            <span className="cart-text">
              <FormattedMessage id="cart" />
            </span>
          </div>
        </nav>
      </div>
      <nav className="nav-bar">
        <button
          className="open-sidebar"
          onClick={() => {
            setSideBar(true);
            setModal(true);
            setSearchModal(false);
          }}
        >
          <img src={navIcon} alt="nav icon" /> <FormattedMessage id="all" />
        </button>

        <a
          onClick={() => {
            localStorage.setItem(
              "current category",
              JSON.stringify("Computers")
            );
            navigate("/products");
          }}
        >
          <FormattedMessage id="Computers" />
        </a>
        <a
          onClick={() => {
            localStorage.setItem("current category", JSON.stringify("Kitchen"));
            navigate("/products");
          }}
        >
          <FormattedMessage id="Kitchen" />
        </a>
        <a
          onClick={() => {
            localStorage.setItem("current category", JSON.stringify("Books"));
            navigate("/products");
          }}
        >
          <FormattedMessage id="Books" />
        </a>
        <a
          onClick={() => {
            localStorage.setItem(
              "current category",
              JSON.stringify("Video Games")
            );
            navigate("/products");
          }}
        >
          <FormattedMessage id="Video Games" />
        </a>
        <a
          onClick={() => {
            localStorage.setItem(
              "current category",
              JSON.stringify("Toys & Games")
            );

            navigate("/products");
          }}
        >
          <FormattedMessage id="Toys & Games" />
        </a>
        <a
          onClick={() => {
            navigate("/cart");
          }}
        >
          <FormattedMessage id="cart" />
        </a>
        {!responsive587Px && (
          <a onClick={() => navigate("/orders")} href="#">
            <FormattedMessage id="returns" /> & <FormattedMessage id="orders" />
          </a>
        )}
      </nav>
      {signInHover && <div className="sign-in-modal-mouseover"></div>}
      {!signInHover && <div className="sign-in-modal-mouseout"></div>}
      {searchModal && (
        <div
          onClick={() => {
            setSearchModal(false);
          }}
          className="search-modal-background"
        ></div>
      )}
    </header>
  );
}
