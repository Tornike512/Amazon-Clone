import { PropsWithChildren } from "react";
import { RouteProps, Route, Navigate } from "react-router-dom";
import { useAuthProvider } from "@src/providers/AuthProvider";
import { TAuthorizationStatus_Enum } from "@src/providers/AuthProvider/AuthContext";

export function PrivateRoute() {
  return <div></div>;
}
