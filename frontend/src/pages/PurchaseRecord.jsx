// import React from 'react'
import { useState, useEffect } from "react";
import Purchase from "./Purchase";
import "./PurchaseRecord.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const PurchaseRecord = ({ userID }) => {
  const [purchaseList, setpurchaseList] = useState([]); // To store list of books in the purchaseList
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  console.log("Location State:", location.state); // Optional: Use if needed

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Pass the userID as a query parameter in the URL
        const response = await fetch(
          `http://localhost:9000/purchase-record?userID=${userID}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Since the filtering is done on the backend, the response should already be the filtered list.
        setpurchaseList(data); // Update purchaseList state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [userID]);

  // Log `purchaseList` whenever it updates
  useEffect(() => {
    console.log("===== Updated purchaseList =====");
    console.log(purchaseList);
  }, [purchaseList]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const book_from_latest = purchaseList.toReversed();
  let index = 0;
  const incrIndex = () => {
      index+=1;
      return index;
  }

  return (
    <>
      <Navbar/>
      <div className="purchaseRecord title">Past Purchases</div>
      <div className="purchase-list">
        {book_from_latest.map((purchase) => (
          <Purchase key={purchase.purchaseID} index={incrIndex()} {...purchase} />
        ))}
      </div>
    </>
  );
};

export default PurchaseRecord;
