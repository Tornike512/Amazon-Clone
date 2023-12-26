import { PropsWithChildren, ProviderProps } from "react";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./GlobalProvider/GlobalProvider";
import "@src/sass/global.scss";

interface Providersprops {}

export function Providers({ children }: PropsWithChildren<ProviderProps>) {
  return (
    <BrowserRouter>
      <GlobalProvider>{children}</GlobalProvider>
    </BrowserRouter>
  );
}
