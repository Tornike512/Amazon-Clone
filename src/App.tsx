import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { PublicLayout } from "./layouts/PublicLayout";
import { Sidebar } from "./components/Navigation/Sidebar/Sidebar";
import { SignInModal } from "./components/Navigation/SignInModal/SignInModal";
import { LanguageChange } from "./features/LanguageChange";

const Home = lazy(() => import("./views/Home"));
const SignInPage = lazy(() => import("./views/SignInPage"));

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route element={<Home />} path="/" />
          </Route>
          <Route element={<SignInPage />} path="/sign-in" />
        </Routes>
      </Suspense>
      <Sidebar />
      <SignInModal />
      <LanguageChange />
    </>
  );
}

export default App;
