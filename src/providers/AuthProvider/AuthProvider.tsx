import { PropsWithChildren, useState } from "react";
import { AuthContext, TAuthorizationStatus_Enum } from "./AuthContext";
import { TAuthRequest } from "@src/@types/RequestTypes";

export function AuthProvider({ children }: PropsWithChildren) {
  const [authStatus, setAuthStatus] = useState<TAuthorizationStatus_Enum>(
    TAuthorizationStatus_Enum.UNAUTHORIZED
  );

  function setAuthData(tokens: TAuthRequest) {
    console.log(tokens);
  }

  return (
    <AuthContext.Provider value={{ authStatus, setAuthStatus, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
}
