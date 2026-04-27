import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { App } from "@/App";
import "@/i18n";
import "@/index.css";
import { initTheme } from "@/lib/theme";

initTheme();

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter basename={base}>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
