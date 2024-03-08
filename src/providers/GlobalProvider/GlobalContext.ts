import { createContext } from "react";

import { TGetProducts } from "@src/@types/RequestTypes";
import { TDeliveryTo_enum } from "@src/@types/Enums";

interface TGlobalContext {
  sideBar: boolean;
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  signInHover: boolean;
  setSignInHover: React.Dispatch<React.SetStateAction<boolean>>;
  languageHover: boolean;
  setLanguageHover: React.Dispatch<React.SetStateAction<boolean>>;
  registerPage: boolean;
  setRegisterPage: React.Dispatch<React.SetStateAction<boolean>>;
  emailInput: string;
  setEmailInput: React.Dispatch<React.SetStateAction<string>>;
  passwordInput: string;
  setPasswordInput: React.Dispatch<React.SetStateAction<string>>;
  nameInput: string;
  setNameInput: React.Dispatch<React.SetStateAction<string>>;
  currentInfo: string;
  setCurrentInfo: React.Dispatch<React.SetStateAction<string>>;
  products: TGetProducts[];
  setProducts: React.Dispatch<React.SetStateAction<TGetProducts[]>>;
  deliverTo: TDeliveryTo_enum;
  setDeliverTo: React.Dispatch<React.SetStateAction<TDeliveryTo_enum>>;
  productId: string;
  setProductId: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  countCartProducts: number;
  setCountCartProducts: React.Dispatch<React.SetStateAction<number>>;
  subtotal: number;
  setSubtotal: React.Dispatch<React.SetStateAction<number>>;
  countProducts: number;
  setCountProducts: React.Dispatch<React.SetStateAction<number>>;
  fullNameInput: string;
  setFullNameInput: React.Dispatch<React.SetStateAction<string>>;
  infoArray: {
    id: string;
    fullNameInput: string;
    phoneNumberInput: string;
    addressInput: string;
    cityInput: string;
    zipCodeInput: string;
  }[];
  setInfoArray: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        fullNameInput: string;
        phoneNumberInput: string;
        addressInput: string;
        cityInput: string;
        zipCodeInput: string;
      }[]
    >
  >;
}

export const GlobalContext = createContext<TGlobalContext>({
  sideBar: false,
  setSideBar: () => {},
  modal: false,
  setModal: () => {},
  signInHover: false,
  setSignInHover: () => {},
  languageHover: false,
  setLanguageHover: () => {},
  registerPage: false,
  setRegisterPage: () => {},
  emailInput: "",
  setEmailInput: () => {},
  passwordInput: "",
  setPasswordInput: () => {},
  nameInput: "",
  setNameInput: () => {},
  currentInfo: "",
  setCurrentInfo: () => {},
  products: [],
  setProducts: () => {},
  deliverTo: TDeliveryTo_enum.UNITED_KINGDOM,
  setDeliverTo: () => {},
  productId: "",
  setProductId: () => {},
  loading: false,
  setLoading: () => {},
  countCartProducts: 0,
  setCountCartProducts: () => {},
  subtotal: 0,
  setSubtotal: () => {},
  countProducts: 0,
  setCountProducts: () => {},
  fullNameInput: "",
  setFullNameInput: () => {},
  infoArray: [],
  setInfoArray: () => {},
});
