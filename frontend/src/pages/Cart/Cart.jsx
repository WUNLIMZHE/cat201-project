import "./Cart.css";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import CartItems from "../../components/cartItem/cartItem";
import emptyBox from "../../assets/emptyBox.png";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes
import FooterContent from "../../components/FooterContent/FooterContent";
import Footer from "../../components/Footer/Footer";

const Cart = (props) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState([]); // To store list of books in the cart
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const location = useLocation();
  console.log("Location State:", location.state); // Optional: Use if needed

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:9000/cart");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      const userCart = data.filter((item) => item.userID === Number(localStorage.getItem("userID")));
      let totalPurchaseAmmount = 0;
      data.map((item) => (totalPurchaseAmmount += item.totalPrice));
      setTotalPrice(totalPurchaseAmmount);
      setCart(userCart); // Update cart state
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart items from the server
  useEffect(() => {
    fetchProducts();
  }, []);

  // // Fetch cart items from the server
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch("http://localhost:9000/cart");
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       const data = await response.json();

  //       const userCart = data.filter((item) => item.userID === props.userID);
  //       let totalPurchaseAmmount = 0;
  //       data.map((item) => (totalPurchaseAmmount += item.totalPrice));
  //       setTotalPrice(totalPurchaseAmmount);
  //       setCart(userCart); // Update cart state
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, [props.userID]);

  // Log `cart` whenever it updates
  useEffect(() => {
    console.log("===== Updated Cart =====");
    console.log(cart);
    let totalPurchaseAmmount = 0;
    cart.map((item) => (totalPurchaseAmmount += item.totalPrice));
    setTotalPrice(totalPurchaseAmmount);
  }, [cart]);

  //   // Update total price
  //   const updateTotalPrice = (bookPrice, qtyChange) => {
  //     setTotalPrice((prevPrice) => prevPrice + bookPrice * qtyChange);
  //   };

  // Change quantity of books in cart
  //   const changeBookQtyFromMenu = (bookId, qtyChange) => {
  //     setCart((prevCart) => {
  //       const updatedCart = prevCart.map((item) =>
  //         item.id === bookId
  //           ? { ...item, quantity: item.quantity + qtyChange }
  //           : item
  //       );

  //       const newCart = updatedCart.filter((item) => item.quantity > 0); // Remove if quantity is zero
  //       return newCart;
  //     });

  //     // Find the price of the book (this assumes book price is available in `cart`)
  //     const book = cart.find((item) => item.id === bookId);
  //     if (book) {
  //       updateTotalPrice(book.price, qtyChange);
  //     }
  //   };

  const updateBookDetails = async (bookId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:9000/cart`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update book details: ${response.status}`);
      }
      console.log("Book updated successfully");
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteBook = async (bookId, deleteTarget) => {
    try {
      const response = await fetch(`http://localhost:9000/cart`, {
        method: "DELETE",
        body: JSON.stringify(deleteTarget),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete book: ${response.status}`);
      }
      console.log("Book deleted successfully");
    } catch (error) {
      console.error(error.message);
    }
  };

  // to be called by cartItems, not to be exported
  // qtyChange and originalQty are entered separately to keep track of qtyChange for the price calculation
  function changeBookQty(bookId, originalQty, qtyChange) {
    const cartContentIndex = cart.findIndex((item) => item.id === bookId);
    const newQuantity = originalQty + qtyChange;
    const totalPrice = newQuantity * cart[cartContentIndex].price;
    if (newQuantity === 0) {
      const cartID = cart[cartContentIndex].cartID;
      // remove item from cart
      console.log(cartID);
      const deleteTarget = {
        cartID: cart[cartContentIndex].cartID,
      };
      deleteBook(bookId, deleteTarget); // Call DELETE request
      setCart(cart.filter((item) => item.id !== bookId));
    } else {
      // Update item in cart
      const updatedData = {
        cartID: cart[cartContentIndex].cartID,
        purchaseUnit: newQuantity,
        totalPrice: totalPrice,
      };
      updateBookDetails(bookId, updatedData); // Call PATCH request

      // Update state
      cart[cartContentIndex] = { ...cart[cartContentIndex], ...updatedData };
      setCart([...cart]);
    }

    // Important: This line below will cause the rerendering of the cartList component
    // hence this component does not need to be manually rerendered via use state
    // updateFinalPrice(bookPrice, qtyChange);
    // cart[cartContentIndex].totalPrice = totalPrice;
    console.log(cart);
  }

  const deductBook = async() => {
    try {
      const data = {
        cart: cart,
      };
      console.log(JSON.stringify(data));
      const response = await fetch(`http://localhost:9000/books`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to remove book from stock: ${response.status}`);
      }
      console.log("Books deducted from stock");
    } catch (error) {
      console.error(error.message);
    }
  }

  const handlePay = async () => {
    try {
      const data = {
        userID: localStorage.getItem("userID"),
        cart: cart,
        address: localStorage.getItem("address")
      };
      const response = await fetch(`http://localhost:9000/purchase-record`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to update book details: ${response.status}`);
      }
      console.log("Payment successful!");
      Swal.fire({
        icon: "success", // This shows a green tick icon
        title: "Payment Successful",
        text: "Thank you for purchasing! Kindly go to purchase history to check for your order status. Have a nice day!",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      });
      await fetchProducts();

      //deduct book from stock after successful purchase
      deductBook();
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const isEmpty = cart===undefined || cart.length===0;

  return (
    <>
      <Navbar />
      <button className="return mt-10">
        &#8592; I want to continue shopping
      </button>
      <h1 className="cartTitle">My Cart</h1>
      <div className="items">
        {console.log(cart)}
        {!isEmpty ? 
          (cart.map((book) => (
            <CartItems
              key={book.id} // Add unique key
              {...book}
              // updateFinalPrice={updateTotalPrice}
              changeBookQty={changeBookQty}
            />
          ))) : (
            <div className="emptyCart">
              <Link to="/books"><img className="NoItems" src={emptyBox} alt="Nothing in cart!"/></Link>
              <p>The cart seems to be empty. Go fill it up with some books!</p>
            </div>
          )
        }
      </div>
      <div className="checkout">
        <span className="finalPrice">
          Total Price: ${totalPrice.toFixed(2)}
        </span>
        <button
          className="bg-green-500 text-white font-bold text-lg py-2 px-12 rounded shadow-md hover:bg-green-600 hover:shadow-lg active:bg-green-700 active:shadow-sm active:translate-y-0.5 transition duration-300 hover:cursor-pointer"
          onClick={handlePay} disabled={totalPrice === 0} // Disable button when totalPrice is 0
        >
          <Link to="/purchase-record">Pay</Link>
        </button>
      </div>
      <FooterContent/>
      <Footer/>
    </>
  );
};

// Prop validation
Cart.propTypes = {
    userID: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired
  };

export default Cart;
