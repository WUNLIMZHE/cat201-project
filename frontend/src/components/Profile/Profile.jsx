import { useState } from "react";
import profile from "../../assets/profile.png";
import "./Profile.css";

export default function Profile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle the dropdown menu when the button is clicked
  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded={isDropdownOpen}
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
        onClick={handleDropdown}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={profile}
          alt="user photo"
        />
      </button>
      {isDropdownOpen && (
        <ul
          className="menu py-2"
          aria-labelledby="user-menu-button"
        >
          <li>
            <a
              href="#"
              className="fancy-hover relative"
            >
              Profile
            </a>
          </li>
          <li>
            <a
              href="#"
              className="fancy-hover relative"
            >
              Sign out
            </a>
          </li>
        </ul>
      )}
    </>
  );
}
