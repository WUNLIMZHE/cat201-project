import { useEffect, useState } from "react";
import "./NavbarAdmin.css";
import logo from "../../assets/books.png";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown/dropdownAdmin";
import Profile from "../Profile/Profile";

const NavbarAdmin = () => {
  const [sticky, setSticky] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Mock a function to toggle login status (for testing)
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const isSmallScreen = windowWidth <= 866.4;

  return (
    <nav className={`container ${sticky ? "dark-nav" : ""}`}>
      <img src={logo} alt="Logo" className="logo" />
      {!isSmallScreen ? (
        <ul>
          <li className="fancy-hover relative">
            <Link to="/admin">Home</Link>
          </li>
          <li className="fancy-hover relative">
            <Link to="/order">Order</Link>
          </li>
          <li className="fancy-hover relative">
            <Link to="/inventory">Inventory</Link>
          </li>
          <li className="fancy-hover relative">
            <Link to="/admin-add-book">Add book</Link>
          </li>

          {/* Conditional Rendering for Profile or Sign In */}
          <li>
            {isLoggedIn ? (
              <Profile />
            ) : (
              <button className="sign-in-btn" onClick={toggleLogin}>
                Sign In
              </button>
            )}
          </li>
        </ul>
      ) : (
        <Dropdown logo="../../assets/hamburger_icon.png"></Dropdown>
      )}
    </nav>
  );
};

export default NavbarAdmin;