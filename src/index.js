import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <BrowserRouter>
    <SnackbarProvider maxSnack={2}>
      <App />
    </SnackbarProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
