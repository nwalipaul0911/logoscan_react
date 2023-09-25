import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Login from "./pages/login";
import Home from "./pages/home";
import ScanLogo from "./pages/scanlogo";
import UploadLogo from "./pages/uploadLogo";
import resultReducer from "./slices/resultSlice.js";
import chunkReducer from "./slices/chunkSLice.js";

const store = configureStore({
  reducer: {
    results: resultReducer,
    chunks: chunkReducer
  },
});

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "scanlogo",
        element: <ScanLogo />,
      },
      {
        path: "upload_logo",
        element: <UploadLogo />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);
