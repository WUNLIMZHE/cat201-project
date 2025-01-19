import { useEffect, useState } from "react";
import "./NavbarAdmin.css";
import logo from "../../assets/books.png";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown/dropdownAdmin";
import Profile from "../Profile/Profile";
const NavbarAdmin = () => {
  const [sticky, setSticky] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    });
  }, []);

  // Update the window width state on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Check if we are on a small screen
  const isSmallScreen = windowWidth <= 866.4;

  return (
    <nav className={`container ${sticky ? "dark-nav" : ""}`}>
      <img src={logo} alt="" className="logo" />
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
          <li>
            <Profile/>
          </li>
        </ul>
      ) : (
        <Dropdown logo="../../assets/hamburger_icon.png"></Dropdown>
      )}
    </nav>
  );
};

export default NavbarAdmin;