import { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/books.png";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown/dropdown";
import iconCart from "../../assets/iconCart.png"
const Navbar = () => {
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
        <ul >
          <li className="fancy-hover relative">
            <Link to="/">Home</Link>
          </li>
          <li className="fancy-hover relative">
            <Link to="/books">Search</Link>
          </li>
          <li className="fancy-hover relative">
            <Link to="/Login">Login</Link>
          </li>
          <li className="hover:scale-110 transition-transform duration-300 ease-in-out">
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>
          </li>
          <li>
            <Link to='/view-my-cart'>
              <img src={iconCart} alt='' className="iconCart"/>
            </Link>
          </li>
          <li className="hover:scale-110 transition-transform duration-300 ease-in-out">
            <Link to="/signup">
              <button className="btn">Sign up</button>
            </Link>
          </li>
        </ul>
      ) : (
        <Dropdown logo="../../assets/hamburger_icon.png"></Dropdown>
      )}
    </nav>
  );
};

export default Navbar;