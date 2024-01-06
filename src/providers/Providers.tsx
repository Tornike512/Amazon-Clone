import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./GlobalProvider/GlobalProvider";
import { LocaleProvider } from "./LocaleProvider";
import "@src/sass/global.scss";

export function Providers({ children }: PropsWithChildren) {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <LocaleProvider>{children}</LocaleProvider>
      </GlobalProvider>
    </BrowserRouter>
  );
}
