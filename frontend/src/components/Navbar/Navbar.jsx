import { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/books.png";
import { Link } from "react-router-dom";
import iconCart from "../../assets/iconCart.png";
import Dropdown from "../Dropdown/dropdown";
import Profile from "../Profile/Profile";
import Swal from "sweetalert2";

const Navbar = ({ userID, role }) => {
  const [sticky, setSticky] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loggedIn, setLoggedIn] = useState(
    Number(localStorage.getItem("userID")) !== 0
  );

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

  const handleLogout = () => {
    Swal.fire({
      icon: "success",
      title: "Logged Out",
      text: "You have been successfully logged out!",
      showConfirmButton: false,
      timer: 1000, // Auto-close after 1 second
    });

    // Update user-related data in localStorage
    // localStorage.setItem("userID", "0"); // Set userID to "0"
    // localStorage.setItem("role", "user"); // Set role to "user"
    // localStorage.setItem("userRole", ""); // Set role to "user"
    // localStorage.setItem("address", ""); // Set address to an empty string
    localStorage.removeItem("userID");
    localStorage.removeItem("role");
    localStorage.removeItem("userRole");
    localStorage.removeItem("address");
    localStorage.setItem("userLoginStatus", false); // Store login status in local storage

    // Update the loggedIn state to trigger re-render
    setLoggedIn(false);
  };

  return (
    <nav className={`${sticky ? "dark-nav" : ""}`}>
      <Link to="/">
        <img
          src={logo}
          alt=""
          className="logo transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
      </Link>

      {!isSmallScreen ? (
        <ul>
          <li className="fancy-hover relative">
            <Link to="/">Home</Link>
          </li>
          {localStorage.getItem("userRole") !== "admin" && (
            <li className="fancy-hover relative">
              <Link to="/books">Our Product</Link>
            </li>
          )}
          {loggedIn && localStorage.getItem("userRole") === "admin" && (
            <li className="fancy-hover relative">
              <Link to="/order">Order</Link>
            </li>
          )}
          {loggedIn && localStorage.getItem("userRole") === "admin" && (
            <li className="fancy-hover relative">
              <Link to="/admin-add-book">Add Book</Link>
            </li>
          )}
          {loggedIn && localStorage.getItem("userRole") === "admin" && (
            <li className="fancy-hover relative">
              <Link to="/inventory">Inventory</Link>
            </li>
          )}
          {loggedIn && localStorage.getItem("userRole") === "user" && (
            <li className="fancy-hover relative">
              <Link to="/purchase-record">My purchase</Link>
            </li>
          )}
          {!loggedIn && (
            <li className="hover:scale-110 transition-transform duration-300 ease-in-out login">
              <Link to="/login">
                <button className="btn">Login</button>
              </Link>
            </li>
          )}
          {loggedIn && localStorage.getItem("userRole") === "user" && (
            <li className="cart-icon">
              <Link to="/view-my-cart">
                <img src={iconCart} alt="" className="iconCart" />
              </Link>
            </li>
          )}
          {loggedIn && localStorage.getItem("userRole") === "user" && (
            <li className="border-none">
              <Link to="/userprofile">
                <Profile />
              </Link>
            </li>
          )}
          {loggedIn && (
            <li className="hover:scale-110 transition-transform duration-300 ease-in-out">
              <Link to="/">
                <button
                  className="btn bg-red-500"
                  id="logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </Link>
            </li>
          )}
        </ul>
      ) : (
        <Dropdown
          logo="../../assets/hamburger_icon.png"
          userID={userID}
          handleLogout={handleLogout}
        ></Dropdown>
      )}
    </nav>
  );
};

export default Navbar;
