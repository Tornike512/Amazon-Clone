import { createContext } from "react";

interface TGlobalContext {
  count: Number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

export const GlobalContext = createContext<TGlobalContext>({
  count: 0,
  setCount: () => {},
});
