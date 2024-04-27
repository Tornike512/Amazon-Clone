import { PropsWithChildren, useState } from "react";
import { GlobalContext } from "./GlobalContext";

import { TGetProducts } from "@src/@types/RequestTypes";
import { TDeliveryTo_enum } from "@src/@types/Enums";

export function GlobalProvider({ children }: PropsWithChildren) {
  const [sideBar, setSideBar] = useState(false);
  const [modal, setModal] = useState<boolean>(false);
  const [signInHover, setSignInHover] = useState<boolean>(false);
  const [languageHover, setLanguageHover] = useState<boolean>(false);
  const [registerPage, setRegisterPage] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [nameInput, setNameInput] = useState<string>("");
  const [currentInfo, setCurrentInfo] = useState<string>("");
  const [products, setProducts] = useState<TGetProducts[]>([]);
  const [deliverTo, setDeliverTo] = useState<TDeliveryTo_enum>(
    TDeliveryTo_enum.UNITED_KINGDOM
  );
  const [productId, setProductId] = useState<string>("");
  const [subtotal, setSubtotal] = useState<number>(0);
  const [countProducts, setCountProducts] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [countCartProducts, setCountCartProducts] = useState<number>(() => {
    const countCartItems = localStorage.getItem("header cart count");
    return countCartItems ? JSON.parse(countCartItems) : 0;
  });
  const [fullNameInput, setFullNameInput] = useState<string>("");
  const [infoArray, setInfoArray] = useState<
    {
      id: string;
      select: boolean;
      fullNameInput: string;
      phoneNumberInput: string;
      addressInput: string;
      cityInput: string;
      zipCodeInput: string;
    }[]
  >([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editCurrentAddress, setEditCurrentAddress] = useState<string>(
    localStorage.getItem("editCurrentAddress") ?? ""
  );
  const [chooseAddress, setChooseAddress] = useState<boolean>(() => {
    const chosenAddress = localStorage.getItem("chooseAddress");
    return chosenAddress ? JSON.parse(chosenAddress) : false;
  });
  const [phoneNumberInput, setPhoneNumberInput] = useState<string>("");
  const [addressInput, setAddressInput] = useState<string>("");
  const [cityInput, setCityInput] = useState<string>("");
  const [zipCodeInput, setZipCodeInput] = useState<string>("");

  const [cards, setCards] = useState<
    {
      id: string;
      select: boolean;
      cardNumber: string;
      nameOnCard: string;
      months: string;
      years: string;
    }[]
  >(() => {
    const storedCards = localStorage.getItem("stored cards");
    return storedCards ? JSON.parse(storedCards) : [];
  });

  const [purchasedItem, setPurchasedItem] = useState<{ id: string }[]>(() => {
    const storedPurchasedItem = localStorage.getItem("purchased item");
    return storedPurchasedItem ? JSON.parse(storedPurchasedItem) : [];
  });
  const [successfulPurchase, setSuccessfulPurchase] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>(() => {
    const storedCurrentCategory = localStorage.getItem("current category");
    return storedCurrentCategory ? JSON.parse(storedCurrentCategory) : "";
  });
  const [wishlistModal, setWishListModal] = useState<boolean>(false);

  return (
    <GlobalContext.Provider
      value={{
        sideBar,
        setSideBar,
        modal,
        setModal,
        signInHover,
        setSignInHover,
        languageHover,
        setLanguageHover,
        registerPage,
        setRegisterPage,
        emailInput,
        setEmailInput,
        passwordInput,
        setPasswordInput,
        nameInput,
        setNameInput,
        currentInfo,
        setCurrentInfo,
        products,
        setProducts,
        deliverTo,
        setDeliverTo,
        productId,
        setProductId,
        loading,
        setLoading,
        countCartProducts,
        setCountCartProducts,
        subtotal,
        setSubtotal,
        countProducts,
        setCountProducts,
        fullNameInput,
        setFullNameInput,
        infoArray,
        setInfoArray,
        isEditMode,
        setIsEditMode,
        editCurrentAddress,
        setEditCurrentAddress,
        chooseAddress,
        setChooseAddress,
        cityInput,
        setCityInput,
        phoneNumberInput,
        setPhoneNumberInput,
        zipCodeInput,
        setZipCodeInput,
        addressInput,
        setAddressInput,
        cards,
        setCards,
        purchasedItem,
        setPurchasedItem,
        successfulPurchase,
        setSuccessfulPurchase,
        currentCategory,
        setCurrentCategory,
        wishlistModal,
        setWishListModal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
