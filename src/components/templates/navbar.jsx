import { NavLink } from 'react-router-dom'
import front_img from "../../assets/ux-live.png"
const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-danger shadow">
        <div className="container-fluid">
          <ul className="col-12 d-flex justify-content-evenly">
            <li className="nav-item "><NavLink to='my-story' className='nav-link text-light'><i className="fa-solid fa-home"></i></NavLink></li>
            <li className="nav-item "><NavLink to='info' className='nav-link text-light'><i className="fa-solid fa-right-from-bracket"></i></NavLink></li>
            <li className="nav-item "><NavLink to='/' className='nav-link text-light'><i className="fa-solid fa-paperclip"></i></NavLink></li>
            <li className="nav-item "><NavLink to='/' className='nav-link text-light'><i className="fa-solid fa-shield"></i></NavLink></li>
            <li className="nav-item "><NavLink to='/' className='nav-link text-light'><i className="fa-solid fa-gear"></i></NavLink></li>
            <li className="nav-item "><NavLink to='/' className='nav-link text-light'><img src={front_img} className="img-fluid nav-img" /></NavLink></li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
