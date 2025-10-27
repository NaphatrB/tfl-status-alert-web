import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

const root = document.getElementById("root");

if (!root) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

if ("serviceWorker" in navigator) {
  const url =
    process.env.NODE_ENV === "production" ? "sw.js" : "/dev-sw.js?dev-sw";
  navigator.serviceWorker.register(url, { scope: "/" });
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
