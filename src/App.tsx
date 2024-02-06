import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PublicLayout } from "./layouts/PublicLayout";
import { Sidebar } from "./components/Navigation/Sidebar/Sidebar";
import { SignInModal } from "./components/Navigation/SignInModal/SignInModal";
import { LanguageChange } from "./features/LanguageChange";
import { PrivateRoute } from "./components/Navigation/PrivateRoute/PrivateRoute";

import { useAuthProvider } from "./providers/AuthProvider";

import { TAuthorizationStatus_Enum } from "./providers/AuthProvider/AuthContext";
import ProfilePage from "./views/ProfilePage";
import WishList from "./views/WishList";

const Home = lazy(() => import("./views/Home"));
const SignInPage = lazy(() => import("./views/SignInPage"));
const RegisterPage = lazy(() => import("./views/RegisterPage"));
const wishList = lazy(() => import("./views/WishList"));
const profilePage = lazy(() => import("./views/ProfilePage"));

function App() {
  const { authstatus } = useAuthProvider();

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
          {authstatus === TAuthorizationStatus_Enum.UNAUTHORIZED && (
            <Route path="/sign-in" element={<SignInPage />} />
          )}
          {authstatus === TAuthorizationStatus_Enum.UNAUTHORIZED && (
            <Route element={<RegisterPage />} path="/register" />
          )}
        </Routes>
      </Suspense>
      <Sidebar />
      <SignInModal />
      <LanguageChange />
    </>
  );
}

export default App;
