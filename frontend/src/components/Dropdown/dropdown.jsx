import { useState } from "react";
import { Link } from "react-router-dom";
import down_arrow from "../../assets/down-arrow.png";
import "./dropdown.css";

export default function Dropdown() {
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
              <span className="fancy-hover relative">Search</span>
            </Link>
          </li>
          <li>
            <Link to="/Login">
              <span className="fancy-hover relative">Login</span>
            </Link>
          </li>
          <li>
            <Link to="/view-my-cart">
              <span className="fancy-hover relative">Cart</span>
            </Link>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/wunlimzhe/"
              className="fancy-hover relative"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact
            </a>
          </li>
        </ul>
      )}
    </>
  );
}
