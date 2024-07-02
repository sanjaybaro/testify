import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { NetworkProvider } from "./context/NetworkContext.jsx";
// import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <NetworkProvider>
    <App />
  </NetworkProvider>
);
