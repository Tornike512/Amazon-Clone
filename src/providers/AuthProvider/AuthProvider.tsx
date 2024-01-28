import { PropsWithChildren, useState } from "react";
import { AuthContext, TAuthorizationStatus_Enum } from "./AuthContext";
import { TAuthRequest, TUserRequest } from "@src/@types/RequestTypes";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@src/config/LocalStorageKeys";
import { setPrivateAccessToken } from "@src/utils/PrivateAxios";

export function AuthProvider({ children }: PropsWithChildren) {
  const [authStatus, setAuthStatus] = useState<TAuthorizationStatus_Enum>(
    TAuthorizationStatus_Enum.UNAUTHORIZED
  );

  const [userData, setUserData] = useState<TUserRequest>();
  console.log(userData);

  function setAuthData(tokens: TAuthRequest) {
    const userData: TUserRequest = jwtDecode(tokens.access_token);
    setUserData(userData);
    localStorage.setItem(ACCESS_TOKEN, tokens.access_token);
    localStorage.setItem(REFRESH_TOKEN, tokens.refresh_token);
    setPrivateAccessToken(tokens.access_token);
    setAuthStatus(TAuthorizationStatus_Enum.AUTHORIZED);
  }

  return (
    <AuthContext.Provider value={{ authStatus, setAuthStatus, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
}
