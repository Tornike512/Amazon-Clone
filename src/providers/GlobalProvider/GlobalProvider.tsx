import { PropsWithChildren, useState } from "react";
import { GlobalContext } from "./GlobalContext";

export function GlobalProvider({ children }: PropsWithChildren) {
  const [sideBar, setSideBar] = useState(false);
  const [modal, setModal] = useState<boolean>(false);
  const [signInHover, setSignInHover] = useState<boolean>(false);
  const [languageHover, setLanguageHover] = useState<boolean>(false);

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
