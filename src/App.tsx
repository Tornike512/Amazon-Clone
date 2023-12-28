import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { PublicLayout } from "./layouts/PublicLayout";

const Home = lazy(() => import("./views/Home"));
const Products = lazy(() => import("./views/Products"));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route element={<Home />} path="/" />
            <Route element={<Products />} path="/products" />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
