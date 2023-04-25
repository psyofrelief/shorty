import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./App";

import { HashRouter as Router } from "react-router-dom";
import { AuthProvider } from "./AuthContext.js"; // Import AuthProvider from your custom provider file

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);
