import { PropsWithChildren, useState } from "react";
import { GlobalContext } from "./GlobalContext";

export function GlobalProvider({ children }: PropsWithChildren) {
  const [sideBar, setSideBar] = useState(false);
  const [modal, setModal] = useState<boolean>(false);

  return (
    <GlobalContext.Provider value={{ sideBar, setSideBar, modal, setModal }}>
      {children}
    </GlobalContext.Provider>
  );
}
