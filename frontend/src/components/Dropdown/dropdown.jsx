import { useState } from "react";
import { Link } from "react-router-dom";
import down_arrow from "../../assets/down-arrow.png";
import "./dropdown.css";
import Swal from "sweetalert2";

export default function Dropdown({ userID, handleLogout}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Toggle the dropdown menu when the button is clicked
  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const [loggedIn, setLoggedIn] = useState(
    Number(localStorage.getItem("userID")) !== 0
  );

  return (
    <>
      <button className="dropdown-button" onClick={() => handleDropdown()}>
        <img src={down_arrow} alt="+" />
      </button>
      {isDropdownOpen && (
        <ul className="menu">
          <li>
            <Link to="/">
              <span className="fancy-hover relative">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/books">
              <span className="fancy-hover relative">Our Product</span>
            </Link>
          </li>
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
          {loggedIn && localStorage.getItem("userRole") === "user" && (
            <li>
              <Link to="/view-my-cart">
                <span className="fancy-hover relative">Cart</span>
              </Link>
            </li>
          )}
          {loggedIn && localStorage.getItem("userRole") === "user" && (
            <li>
              <Link to="/userprofile">
                <span className="fancy-hover relative">Profile</span>
              </Link>
            </li>
          )}
          {!loggedIn && (
            <li>
              <Link to="/login">
                <span className="fancy-hover relative">Login</span>
              </Link>
            </li>
          )}
          {loggedIn && (
            <li>
              <Link to="/">
                <span className="fancy-hover relative" onClick={() => {handleLogout(); setLoggedIn(false)}}>Logout</span>
              </Link>
            </li>
          )}
        </ul>
      )}
    </>
  );
}
