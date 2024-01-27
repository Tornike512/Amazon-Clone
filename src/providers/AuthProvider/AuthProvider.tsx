import { PropsWithChildren, useState } from "react";
import { AuthContext, TAuthorizationStatus_Enum } from "./AuthContext";

export function AuthProvider({ children }: PropsWithChildren) {
  const [authStatus, setAuthStatus] = useState<TAuthorizationStatus_Enum>(
    TAuthorizationStatus_Enum.UNAUTHORIZED
  );

  return (
    <AuthContext.Provider value={{ authStatus, setAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
}
