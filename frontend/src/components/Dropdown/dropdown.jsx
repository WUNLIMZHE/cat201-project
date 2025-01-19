import { useState } from "react";
import { Link } from "react-router-dom";
import down_arrow from "../../assets/down-arrow.png";
import "./dropdown.css";

export default function Dropdown({ userID, loggedIn }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Toggle the dropdown menu when the button is clicked
  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
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
          {loggedIn && (
          <li>
            <Link to="/purchase-record">
              <span className="fancy-hover relative">My Purchase</span>
            </Link>
          </li>)}
          {loggedIn && (
          <li>
            <Link to="/view-my-cart">
              <span className="fancy-hover relative">Cart</span>
            </Link>
          </li>)}
          {loggedIn && (
          <li>
            <Link to="/userprofile">
              <span className="fancy-hover relative">Profile</span>
            </Link>
          </li>)}
          {!loggedIn && (
          <li>
            <Link to="/login">
              <span className="fancy-hover relative">Login</span>
            </Link>
          </li>)}
          {loggedIn && (
          <li>
            <Link to="/logout">
              <span className="fancy-hover relative">Logout</span>
            </Link>
          </li>)}
        </ul>
      )}
    </>
  );
}
