import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars} from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import './Navbar.css'


const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false)

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <header>
      <img
        className="logo"
        src="https://satabdisundar-portfolio.netlify.app/Images/logoWBorder2.png"
        alt="logo"
        width={80}
      />
        <div className="menu" onClick={()=>{setShowMenu(!showMenu)}}>
            {showMenu? <FaX className="hide"/>: <FaBars className="show"/> }
          </div>
      {auth ? (
        <nav className="usernav">
          <ul className={showMenu ? "nav-ul open" : "nav-ul"}>
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/add">Add Product</Link>
            </li>
            {/* <li><Link to="/update">Update Product</Link></li> */}
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link onClick={logout} to="/signup">
                Logout({JSON.parse(auth).name.split(" ")[0]})
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="usernav">
          <ul className={showMenu ? "nav-ul open" : "nav-ul"}>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
