import { PropsWithChildren, useState } from "react";
import { GlobalContext } from "./GlobalContext";

export function GlobalProvider({ children }: PropsWithChildren) {
  const [sideBar, setSideBar] = useState(false);

  return (
    <GlobalContext.Provider value={{ sideBar, setSideBar }}>
      {children}
    </GlobalContext.Provider>
  );
}
