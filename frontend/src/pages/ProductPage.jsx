import React, { useEffect, useState } from "react";

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
      {products.length > 0 ? (
        <div>
          {products.map((product) => (
            <div key={product.id}>
              <h2>{product.title}</h2>
              <img
                src={product.image}
                alt={product.title}
                style={{ maxWidth: "300px" }}
              />
              <p>
                <strong>Author:</strong> {product.author}
              </p>
              <p>
                <strong>Genre:</strong> {product.genre}
              </p>
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <p>
                <strong>Price:</strong> RM {product.price}
              </p>
              <p>
                <strong>Language:</strong> {product.language}
              </p>
              <p>
                <strong>Description:</strong> {product.description}
              </p>
              <p>
                <strong>Rating:</strong> {product.review} stars
              </p>
              <p>
                <strong>Sold Units:</strong> {product["sold-units"]}
              </p>
              <p>
                <strong>ISBN:</strong> {product.isbn}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductPage;
