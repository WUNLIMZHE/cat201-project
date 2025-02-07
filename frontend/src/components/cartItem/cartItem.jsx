import Swal from "sweetalert2";
// import React, { useState } from "react";
import "./cartItem.css";

const cartItems = (props) => {
  const handleAddBook = () => {
    if (props.purchaseUnit + 1 > props.stock) {
      // Show a warning if the stock is insufficient
      Swal.fire({
        icon: "warning",
        title: "Insufficient Stock",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      });
    } else {
      props.changeBookQty(props.id, props.purchaseUnit, 1);
    }
  };

  const handleMinusBook = () => {
    if (props.purchaseUnit - 1 === 0) {
      // Show a delete confirmation dialog
      Swal.fire({
        icon: "warning",
        title: "Remove Book?",
        text: "Are you sure you want to remove this book from your cart?",
        showCancelButton: true, // Enable the cancel button
        confirmButtonColor: "#d33", // Red color for confirm button
        cancelButtonColor: "#3085d6", // Blue color for cancel button
        confirmButtonText: "Yes, remove it",
        cancelButtonText: "No, keep it",
      }).then((result) => {
        if (result.isConfirmed) {
          // If the user confirms, delete the book
          //   handleBookDelete(props.id);
          props.changeBookQty(props.id, props.purchaseUnit, -1);
        } else {
          // If the user cancels, simply return
          Swal.fire({
            icon: "info",
            title: "Book kept",
            text: "The book has not been removed from your cart.",
            timer: 1500, // Auto-close after 1.5 seconds
            showConfirmButton: false,
          });
        }
      });
    } else {
      // Decrease the quantity of the book
      props.changeBookQty(props.id, props.purchaseUnit, -1);
    }
  };

  return (
    <div className="cartItem">
      <img src={props.image} className=" max-h-[300px] lg:max-w-fit" />
      <div className="right-sidebar md:ml-10">
        <h1 className="title">{props.title}</h1>
        <div className="tag flex-wrap">
          <p className="info language font-bold ">
            {props.language
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")}
          </p>
          <p className="info category font-bold ">
            {props.category
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")}
          </p>
          <p className="info genre font-bold">
            {props.genre
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")}
          </p>
        </div>

        <div className="enlarged">
          <p className="price">Price: RM {props.totalPrice}</p>
          <p className="stock">Stock left: {props.stock}</p>
        </div>
        <div className="change-quantity">
          <button className="changeQty addBook" onClick={handleAddBook}>
            +
          </button>
          <p className="info quantity">
            {props.purchaseUnit}{" "}
            {`${props.purchaseUnit == 1 ? "copy" : "copies"}`} in cart
          </p>
          <button className="changeQty removeBook" onClick={handleMinusBook}>
            -
          </button>
        </div>
      </div>
    </div>
  );
};
export default cartItems;
