import { Outlet } from "react-router-dom";
import { Header } from "@src/components/Header";
import OrderPage from "@src/views/OrderPage";

export function PublicLayout() {
  const currentUrl = window.location.href;

  return (
    <>
      <div>
        <Header />
        {currentUrl.includes("orders") ? <OrderPage /> : <Outlet />}
      </div>
    </>
  );
}
