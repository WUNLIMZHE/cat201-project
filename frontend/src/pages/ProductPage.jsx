import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CardsLayout from "../components/CardsLayout";
import Filter from "../components/Filter";
import SearchBar from "../components/SearchBar";
import "./ProductPage.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]); // To store list of books
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchQuery, setSearchQuery] = useState(""); // Search input value
  const [filteredProducts, setFilteredProducts] = useState([]); // To store filtered products
  const [filters, setFilters] = useState({ languages: [], categories: [] });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:9000/books");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data); // Store the list of books in state
        setFilteredProducts(data); // Initialize filtered products with all products
      } catch (err) {
        setError(err.message); // Capture error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();

    // Cleanup function
    return () => {
      setLoading(false); // Optional: to stop loading if component unmounts
    };
  }, []);

  const location = useLocation();
  console.log("Location State:", location.state); // Should show the full state object

  // Handle search query change (on each keystroke)
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query as the user types
  };

  // Handle form submit (triggered by button click)
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh on form submission

    // Filter products based on the search query when the submit button is clicked
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredProducts(filtered); // Update the filtered products state
  };

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);

    // Apply filtering logic
    let filtered = products.filter((product) => {
      const matchesLanguage = newFilters.language
        ? product.language === newFilters.language
        : true;
      const matchesCategory = newFilters.bookCategory
        ? product.category === newFilters.bookCategory
        : true;

      return matchesLanguage && matchesCategory;
    });

    // Sort based on rating
    if (newFilters.rating) {
      filtered = filtered.sort((a, b) => {
        return newFilters.rating === "highest"
          ? b.review - a.review // Descending order for highest
          : a.review - b.review; // Ascending order for lowest
      });
    }

    // Sort based on sales
    if (newFilters.sales) {
      filtered = filtered.sort((a, b) => {
        return newFilters.sales === "highest"
          ? b.soldUnits - a.soldUnits // Descending order for highest
          : a.soldUnits - b.soldUnits; // Ascending order for lowest
      });
    }

    setFilteredProducts(filtered);
  };

  // Render list of books if available
  return (
    <div>
      <h1>Product Page</h1>
      <Filter products={products} onFilterChange={handleFilterChange} />
      <h1 className="center animate-heading">Book Search</h1>
      <SearchBar
        value={searchQuery}
        onChange={handleSearchChange}
        onSubmit={handleSearchSubmit}
      />
      {/* Pass search query, change handler, and submit handler */}
      <CardsLayout products={filteredProducts} />
      {/* Pass filtered products to CardsLayout */}
    </div>
  );
};

export default ProductPage;
