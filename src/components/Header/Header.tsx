import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { useNavigate } from "react-router-dom";
import { LocaleContext } from "@src/providers/LocaleProvider";
import { FormattedMessage } from "react-intl";
import { useAuthProvider } from "@src/providers/AuthProvider";
import { useDebounce } from "@src/hooks/useDebounce";

import { TCartProducts, TGetProducts } from "@src/@types/RequestTypes";
import { TAuthorizationStatus_Enum } from "@src/providers/AuthProvider/AuthContext";

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

  const debounceSearch = useDebounce(searchInput, 500);

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

  console.log(searchInput);

  console.log(products);

  const {
    setSideBar,
    modal,
    setModal,
    setSignInHover,
    signInHover,
    setLanguageHover,
    languageHover,
    nameInput,
    setCurrentInfo,
    countCartProducts,
  } = useContext(GlobalContext);

  const { toggleLocale } = useContext(LocaleContext);

  const { authStatus } = useAuthProvider();

  const storedFirstName = localStorage.getItem("firstName");

  const currentCategory = localStorage.getItem("current category");

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
                <span className="deliver-to">Deliver to</span>
                <span className="usa">United States</span>
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
                  ? { width: "16%" }
                  : selectNiche === "Kitchen"
                  ? { width: "13%" }
                  : selectNiche === "Books"
                  ? { width: "11%" }
                  : selectNiche === "Video Games"
                  ? { width: "19%" }
                  : selectNiche === "Toys & Games"
                  ? { width: "19%" }
                  : undefined
              }
            >
              <option value="/">All</option>
              {categories.map((category) => {
                return (
                  <option value={category.name} key={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              placeholder="Search Amazon"
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
            <img src={usaFlag} alt="US Flag" />
            <span>EN</span>
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
              setSignInHover(true);
              setSearchModal(false);
            }}
            onMouseLeave={() => setSignInHover(false)}
            className="sign-in"
          >
            <div className="sign-in-spacing">
              <span className="sign-in-text">
                Hello,
                {authStatus === TAuthorizationStatus_Enum.AUTHORIZED ? (
                  <span>{storedFirstName}</span>
                ) : (
                  <span>Sign in</span>
                )}
              </span>
              <p className="account-list">
                <b>Account & Lists</b>
              </p>
            </div>
            <img
              className="sign-in-dropdown"
              src={dropDownIcon}
              alt="sign in dropdown icon"
            />
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
            <span>Returns</span>
            <p>& Orders</p>
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
            <span className="cart-text">Cart</span>
          </div>
        </nav>
      </div>
      <nav className="nav-bar">
        <button
          className="open-sidebar"
          onClick={() => {
            setSideBar(true);
            setModal(true);
          }}
        >
          <img src={navIcon} alt="nav icon" /> All
        </button>

        <a href="#">Today's Deals</a>
        <a href="#">Customer Service</a>
        <a href="#">Registry</a>
        <a href="#">Gift Cards</a>
        <a href="#">Sell</a>
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
