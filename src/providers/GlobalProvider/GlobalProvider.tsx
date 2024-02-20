import { PropsWithChildren, useState } from "react";
import { TGetProducts } from "@src/@types/RequestTypes";
import { GlobalContext } from "./GlobalContext";

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
