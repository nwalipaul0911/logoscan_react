import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import ScanLogo from "./pages/scanlogo";
import UploadLogo from "./pages/uploadLogo";
import ReviewsPage from "./pages/ReviewsPage.jsx";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'scanlogo',
                element: <ScanLogo/>
            },
            {
                path: 'upload_logo',
                element: <UploadLogo/>
            }, {
                path: 'reviews/:imageId',
                element: <ReviewsPage/>
            }
        ],
    },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={routes}/>
    </React.StrictMode>
);
