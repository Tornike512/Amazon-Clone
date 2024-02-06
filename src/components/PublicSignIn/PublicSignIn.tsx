import { PropsWithChildren } from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuthProvider } from "@src/providers/AuthProvider";
import { TAuthorizationStatus_Enum } from "@src/providers/AuthProvider/AuthContext";

export function PublicSignIn({ children }: PropsWithChildren) {
  const { authStatus } = useAuthProvider();

  return authStatus === TAuthorizationStatus_Enum.UNAUTHORIZED ? (
    <>{children}</>
  ) : (
    <Navigate to="/sign-in" />
  );
}
