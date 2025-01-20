import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar h-max">
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/order">Orders</Link></li>
        {/* <li><Link to="/payment">Payment</Link></li> */}
        <li><Link to="/inventory">Inventory</Link></li>
        <li><Link to="/admin-add-book">Add Book</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
