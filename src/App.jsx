import React from "react";
import Navbar from "./components/templates/navbar";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <Navbar />
      <div className="container-fluid bg-danger">
        <Outlet />
      </div>
    </>
  );
}

export default App;
