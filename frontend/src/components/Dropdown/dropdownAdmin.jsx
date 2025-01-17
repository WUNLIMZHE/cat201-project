import { useState } from "react";
import { Link } from "react-router-dom";
import down_arrow from "../../assets/down-arrow.png";
import "./dropdown.css";

export default function DropdownAdmin() {
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
            <Link to="/admin">
              <span className="fancy-hover relative">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/order">
              <span className="fancy-hover relative">Order</span>
            </Link>
          </li>
          <li>
            <Link to="/inventory">
              <span className="fancy-hover relative">Inventory</span>
            </Link>
          </li>
          <li>
            <Link to="/admin-add-book">
              <span className="fancy-hover relative">Add book</span>
            </Link>
          </li>
          <li>
            <Link to="/#">
              <span className="fancy-hover relative">Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/#">
              <span className="fancy-hover relative">Sign out</span>
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}