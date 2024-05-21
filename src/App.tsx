import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { PublicLayout } from "./layouts/PublicLayout";
import { Analytics } from "@vercel/analytics/react";

import { Sidebar } from "./components/Navigation/Sidebar/Sidebar";
import { SignInModal } from "./components/Navigation/SignInModal/SignInModal";
import { LanguageChange } from "./features/LanguageChange";

import { PrivateRoute } from "./components/Navigation/PrivateRoute";
import { PublicRoute } from "./components/Navigation/PublicRoute";

const Home = lazy(() => import("./views/Home"));
const SignInPage = lazy(() => import("./views/SignInPage"));
const RegisterPage = lazy(() => import("./views/RegisterPage"));
const WishList = lazy(() => import("./views/WishList"));
const ProfilePage = lazy(() => import("./views/ProfilePage"));
const OrderPage = lazy(() => import("./views/OrderPage"));
const ProductsPage = lazy(() => import("./views/ProductsPage"));
const OneProductPage = lazy(() => import("./views/OneProductPage"));
const CartPage = lazy(() => import("./views/CartPage"));
const PurchasePage = lazy(() => import("./views/PurchasePage"));

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route element={<Home />} path="/" />
            <Route
              path="/profile"
              element={<PrivateRoute children={<ProfilePage />} />}
            ></Route>
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<OneProductPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>
          <Route
            path="/sign-in"
            element={
              <PublicRoute>
                <SignInPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route path="/purchase" element={<PurchasePage />} />
        </Routes>
      </Suspense>
      <Sidebar />
      <SignInModal />
      <LanguageChange />
      <Analytics />
    </>
  );
}

export default App;
