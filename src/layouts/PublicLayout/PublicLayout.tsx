import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";

import { Header } from "@src/components/Header";

export function PublicLayout() {
  const { loading } = useContext(GlobalContext);

  return (
    <div>
      {!loading && <Header />}
      <Outlet />
    </div>
  );
}
