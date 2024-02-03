import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext, TAuthorizationStatus_Enum } from "./AuthContext";
import { TAuthRequest, TUserRequest } from "@src/@types/RequestTypes";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@src/config/LocalStorageKeys";
import { setPrivateAccessToken } from "@src/utils/PrivateAxios";
import { PublicAxios } from "@src/utils/PublicAxios";

export function AuthProvider({ children }: PropsWithChildren) {
  const [authStatus, setAuthStatus] = useState<TAuthorizationStatus_Enum>(
    TAuthorizationStatus_Enum.UNAUTHORIZED
  );
  const [userData, setUserData] = useState<TUserRequest>();

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if (refreshToken) {
      getNewAccessToken(refreshToken);
    }
  }, []);

  console.log(userData);

  function setAuthData(tokens: TAuthRequest) {
    const tokenData: TUserRequest = jwtDecode(tokens.access_token);
    setUserData(tokenData);
    localStorage.setItem(ACCESS_TOKEN, tokens.access_token);
    localStorage.setItem(REFRESH_TOKEN, tokens.refresh_token);
    setPrivateAccessToken(tokens.access_token);
    setAuthStatus(TAuthorizationStatus_Enum.AUTHORIZED);
  }

  async function getNewAccessToken(refreshToken: string) {
    try {
      const response = await PublicAxios.post<TAuthRequest>(
        "/auth/update-tokens",
        { refresh_token: refreshToken }
      );
      console.log(response);
    } catch (erro) {
      signOut();
    }
  }

  function signOut() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setUserData(undefined);
    setAuthStatus(TAuthorizationStatus_Enum.UNAUTHORIZED);
  }

  return (
    <AuthContext.Provider
      value={{ authStatus, setAuthStatus, setAuthData, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
}
