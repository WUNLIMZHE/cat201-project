import React from "react";
import { Link } from "react-router-dom";
import "./Program.css";
import search_program from "../../assets/read-book.webp";
import cart_program from "../../assets/bookstore-cashier.webp";
import order_program from "../../assets/receive-book.webp";
import search_icon from "../../assets/search.png";
import cart_icon from "../../assets/shopping-cart.png";
import order_icon from "../../assets/test.png";

const Program = () => {
  return (
    <div className="programs">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 items-center gap-10 mx-10 md:mx-0">
        <Link className="program" to="/books">
          <div>
            <img src={search_program} alt="" />
            <div className="caption">
              <img src={search_icon} alt="" />
              <p>Search</p>
            </div>
          </div>
        </Link>
        <Link className="program" to="/view-my-cart">
          <div>
            <img src={cart_program} alt="" />
            <div className="caption">
              <img src={cart_icon} alt="" />
              <p>Cart</p>
            </div>
          </div>
        </Link>
        <Link className="program" to="/orders">
          <div>
            <img src={order_program} alt="" />
            <div className="caption">
              <img src={order_icon} alt="" />
              <p>Order</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Program;