import { Outlet } from "react-router-dom";

import { Header } from "@src/components/Header";
import { Footer } from "@src/components/Footer/Footer";

export function PublicLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
