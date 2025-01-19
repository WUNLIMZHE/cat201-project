import React, { useState, useEffect } from "react";
import BookItem from "./BookItem/BookItem";
import "./Purchase.css";

const Purchase = ({
  index,
  books,
  purchaseID,
  shippingAddress,
  totalAmmount,
  purchaseDate,
  purchaseStatus,
}) => {
  const [statusColor, setStatusColor] = useState("");
  // Set the color based on the purchaseStatus when component mounts or purchaseStatus changes
  useEffect(() => {
    const setStateColor = () => {
      if (purchaseStatus === "Pending") {
        setStatusColor("#ff6623");
      } else if (purchaseStatus === "Confirmed") {
        setStatusColor("#00d26b");
      } else if (purchaseStatus === "Processing") {
        setStatusColor("#ffad30");
      } else if (purchaseStatus === "Shipped") {
        setStatusColor("#00a7ec");
      } else if (purchaseStatus === "Out for Delivery") {
        setStatusColor("#01a5ed");
      } else if (purchaseStatus === "Delivered") {
        setStatusColor("#00d369");
      } else if (purchaseStatus === "Cancelled / Failed") {
        setStatusColor("#fc2f2a");
      } else if (purchaseStatus === "Returned / Refunded") {
        setStatusColor("#c493ec");
      }
    };

    setStateColor();
  }, [purchaseStatus]); // This will trigger whenever purchaseStatus changes
  let indexBook = 0;
  const incrIndex = () => {
    indexBook += 1;
    return indexBook;
  };
  return (
    <div className="purchase">
      <div className="heading">
        <div className="upper">
          <p className="index">{index}</p>
        </div>
        <div className="flex justify-between items-center purchase-container">
          <p className="purchaseId mb-1">Receipt ID: {purchaseID}</p>
          <p
            className="badge border-0 border-none mr-2 md:mr-5 lg:mr-8 p-4 font-bold"
            style={{ backgroundColor: statusColor }}
          >
            {purchaseStatus}
          </p>
        </div>

        <p className="total mb-1">Total Purchase: RM {totalAmmount}</p>
        <p className="text-base">Date: {purchaseDate}</p>
        <p className="shipping">Delivered to: {shippingAddress}</p>
      </div>
      <ul className="book-list">
        {books.map((book) => (
          <BookItem key={book.id} index={incrIndex()} {...book} />
        ))}
      </ul>
      <div className="separator"></div>
    </div>
  );
};

export default Purchase;
