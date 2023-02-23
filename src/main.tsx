import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import FavsProvider from "./contexts/FavsProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FavsProvider>
      <App />
    </FavsProvider>
  </React.StrictMode>
);
