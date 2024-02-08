import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { PublicLayout } from "./layouts/PublicLayout";

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
        </Routes>
      </Suspense>
      <Sidebar />
      <SignInModal />
      <LanguageChange />
    </>
  );
}

export default App;
