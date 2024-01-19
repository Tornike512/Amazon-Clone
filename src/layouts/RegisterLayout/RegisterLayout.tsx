import { Header } from "@src/components/Header";
import { Outlet } from "react-router-dom";

export function RegisterLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
