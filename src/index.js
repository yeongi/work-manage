import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { LoginProvider } from "./lib/store/LoginContext";
// import "antd/dist/antd.min.css";

ReactDOM.render(
  <React.StrictMode>
    <LoginProvider>
      <App />
    </LoginProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
