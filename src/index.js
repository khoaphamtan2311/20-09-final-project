import React from "react";
import ReactDOM from "react-dom";
import "./styles/global.css";
import App from "./App";
import DataProvider from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import Alert from "./components/alert/Alert";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider>
        <Alert />
        <App />
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
