import { createContext } from "react";

interface TGlobalContext {
  sideBar: boolean;
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = createContext<TGlobalContext>({
  sideBar: false,
  setSideBar: () => {},
});
