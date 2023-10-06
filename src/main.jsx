import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import ScanLogo from "./pages/scanlogo";
<<<<<<< HEAD
import UploadLogo from "./pages/uploadLogo";
import ReviewsPage from "./pages/ReviewsPage.jsx";
=======
import Reviews from "./pages/reviews";
import resultReducer from "./slices/resultSlice.js";
import chunkReducer from "./slices/chunkSLice.js";
import UploadAdmin from "./pages/upload_admin";
>>>>>>> e24f2fb51a22c67ff162fca1fd367b92620553ab

const store = configureStore({
  reducer: {
    results: resultReducer,
    chunks: chunkReducer
  },
});

const routes = createBrowserRouter([
<<<<<<< HEAD
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
=======
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
        path: "admin_upload",
        element: <UploadAdmin />,
      },
      {
        path: "reviews/:id",
        element: <Reviews />,
        loader: async({params})=>{
          let logo_id = params.id


        }
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
>>>>>>> e24f2fb51a22c67ff162fca1fd367b92620553ab
);
