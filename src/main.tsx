import React from "react";
import ReactDOM from "react-dom/client";
import App from "@src/App.tsx";
import { Providers } from "@src/providers/Providers.tsx";
import { Analytics } from "@vercel/analytics/react";

import "@src/sass/global.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <App />
      <Analytics />
    </Providers>
  </React.StrictMode>
);
