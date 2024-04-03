import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./GlobalProvider/GlobalProvider";
import { LocaleProvider } from "./LocaleProvider";
import { AuthProvider } from "./AuthProvider";
import { ResponsiveProvider } from "./ResponsiveProvider";
import "@src/sass/global.scss";

export function Providers({ children }: PropsWithChildren) {
  return (
    <BrowserRouter>
      <ResponsiveProvider>
        <GlobalProvider>
          <AuthProvider>
            <LocaleProvider>{children}</LocaleProvider>
          </AuthProvider>
        </GlobalProvider>
      </ResponsiveProvider>
    </BrowserRouter>
  );
}
