import "./index.css";

import React from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app";

const root = createRoot(document.querySelector("#root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
