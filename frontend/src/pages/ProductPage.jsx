import React, { useEffect, useState } from "react";
import CardsLayout from "../components/CardsLayout";
import Filter from "../components/Filter";
import SearchBar from "../components/SearchBar";
import "./ProductPage.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]); // To store list of books
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch product details when the component is mounted
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:9000/books");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data); // Store the list of books in state
      } catch (err) {
        setError(err.message); // Capture error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, []);

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render list of books if available
  return (
    <div>
      <h1>Product Page</h1>
      <Filter />
      <h1 className="center animate-heading">Book Search</h1>
      <SearchBar />
      <CardsLayout products={products} />
    </div>
  );
};

export default ProductPage;
