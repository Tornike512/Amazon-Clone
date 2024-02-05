import { lazy, Suspense, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { PublicLayout } from "./layouts/PublicLayout";
import { Sidebar } from "./components/Navigation/Sidebar/Sidebar";
import { SignInModal } from "./components/Navigation/SignInModal/SignInModal";
import { LanguageChange } from "./features/LanguageChange";
import { GlobalContext } from "./providers/GlobalProvider";

const Home = lazy(() => import("./views/Home"));
const SignInPage = lazy(() => import("./views/SignInPage"));
const RegisterPage = lazy(() => import("./views/RegisterPage"));
const wishList = lazy(() => import("./views/WishList"));

function App() {
  const { registerPage } = useContext(GlobalContext);

  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route element={<Home />} path="/" />
          </Route>
          <Route element={<SignInPage />} path="/sign-in" />
          <Route element={<RegisterPage />} path="/register" />
        </Routes>
      </Suspense>
      <Sidebar />
      <SignInModal />
      <LanguageChange />
    </>
  );
}

export default App;
