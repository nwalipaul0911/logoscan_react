import { NavLink } from "react-router-dom";
import front_img from "../assets/ux-live.png";
const Footer = () => {
  return (
    <div className="container-fluid position-fixed bottom-0 shadow footer">
      <ul className="col-12 d-flex justify-content-evenly">
        <li className="nav-item ">
          <NavLink to="/" className="nav-link text-light">
            Home <i className="fa-solid fa-home"></i>
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink to="login" className="nav-link text-light">
            Login <i className="fa-solid fa-right-to-bracket"></i>
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink to="/admin_upload" className="nav-link text-light">
            Admin <i className="fa-solid fa-lock"></i>
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink to="scanlogo" className="nav-link text-light">
            Scan <i className="fa-solid fa-magnifying-glass"></i>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
