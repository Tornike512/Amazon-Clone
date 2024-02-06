import { Children, PropsWithChildren } from "react";
import { RouteProps, Route, Navigate } from "react-router-dom";
import { useAuthProvider } from "@src/providers/AuthProvider";
import { TAuthorizationStatus_Enum } from "@src/providers/AuthProvider/AuthContext";

export function PrivateRoute({ children }: PropsWithChildren) {
  const { authStatus } = useAuthProvider();

  return authStatus === TAuthorizationStatus_Enum.AUTHORIZED ? (
    <Route>{children}</Route>
  ) : (
    <Navigate to="/" />
  );
}
