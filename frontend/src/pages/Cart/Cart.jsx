import "./Cart.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import CartItems from "../../components/cartItem/cartItem";

const Cart = (props) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState([]); // To store list of books in the cart
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const location = useLocation();
  console.log("Location State:", location.state); // Optional: Use if needed

  // Fetch cart items from the server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:9000/cart");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        const userCart = data.filter((item) => item.userID === props.userID);
        let totalPurchaseAmmount = 0;
        data.map(item => totalPurchaseAmmount += item.totalPrice);
        setTotalPrice(totalPurchaseAmmount);
        setCart(userCart); // Update cart state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [props.userID]);

  // Log `cart` whenever it updates
  useEffect(() => {
    console.log("===== Updated Cart =====");
    console.log(cart);
  }, [cart]);

  // Update total price
  const updateTotalPrice = (bookPrice, qtyChange) => {
    setTotalPrice((prevPrice) => prevPrice + bookPrice * qtyChange);
  };

  // Change quantity of books in cart
  const changeBookQtyFromMenu = (bookId, qtyChange) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === bookId
          ? { ...item, quantity: item.quantity + qtyChange }
          : item
      );

      const newCart = updatedCart.filter((item) => item.quantity > 0); // Remove if quantity is zero
      return newCart;
    });

    // Find the price of the book (this assumes book price is available in `cart`)
    const book = cart.find((item) => item.id === bookId);
    if (book) {
      updateTotalPrice(book.price, qtyChange);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Navbar />
      <button className="return mt-10">
        &#8592; I want to continue shopping
      </button>
      <h1 className="title">My Cart</h1>
      <div className="items">
        {console.log(cart)}
        {cart.map((book) => (
          <CartItems
            key={book.id} // Add unique key
            {...book}
            updateFinalPrice={updateTotalPrice}
          />
        ))}
      </div>
      <div className="checkout">
        <span className="finalPrice">
          Total Price: ${totalPrice.toFixed(2)}
        </span>
      </div>
    </>
  );
};

export default Cart;
