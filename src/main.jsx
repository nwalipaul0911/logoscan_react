import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Login from "./components/login";
import Info from "./components/info";
import MyStory from "./components/mystory";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import logoReducer from "./components/reducers/logoreducer";
import resultReducer from "./components/reducers/resultreducer";

const store = configureStore({
  reducer: {
    logo: logoReducer,
    results: resultReducer,
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Login /> },
      {
        path: "my-story",
        element: <MyStory />,
      },
      {
        path: "info",
        element: <Info />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
