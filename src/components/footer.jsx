import { NavLink } from "react-router-dom";
import front_img from "../assets/ux-live.png";
const Footer = () => {
  return (
    <>
      <div className="container-fluid position-fixed bottom-0 shadow footer">
        <ul className="col-12 d-flex justify-content-evenly">
          <li className="nav-item ">
            <NavLink to="/" className="nav-link text-light">
              <i className="fa-solid fa-home"></i>
            </NavLink>
          </li>
          <li className="nav-item ">
            <NavLink to="login" className="nav-link text-light">
              <i className="fa-solid fa-right-from-bracket"></i>
            </NavLink>
          </li>
          <li className="nav-item ">
            <NavLink to="upload_logo" className="nav-link text-light">
            <i className="fa-solid fa-upload"></i>
            </NavLink>
          </li>
          <li className="nav-item ">
            <NavLink to="scanlogo" className="nav-link text-light">
              <i className="fa-solid fa-camera"></i>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Footer;
