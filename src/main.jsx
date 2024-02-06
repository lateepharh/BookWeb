import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { FaavouriteContextProvider } from "./componenet/store/favourite-context.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FaavouriteContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FaavouriteContextProvider>
  </React.StrictMode>
);
