import { createContext } from "react";

interface TGlobalContext {
  sideBar: boolean;
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  signInHover: boolean;
  setSignInHover: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = createContext<TGlobalContext>({
  sideBar: false,
  setSideBar: () => {},
  modal: false,
  setModal: () => {},
  signInHover: false,
  setSignInHover: () => {},
});
