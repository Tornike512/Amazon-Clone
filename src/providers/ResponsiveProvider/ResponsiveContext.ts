import { createContext } from "react";

interface TResponsiveContext {
  responsive587Px: boolean;
  setResponsive587Px: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ResponsiveContext = createContext<TResponsiveContext>({
  responsive587Px: false,
  setResponsive587Px: () => {},
});
