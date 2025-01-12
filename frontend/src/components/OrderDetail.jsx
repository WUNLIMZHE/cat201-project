import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./OrderDetail.css"; // Ensure this is imported
import back from "/back.webp";
import cancel from "/cancelled.png";
import complete from "/completed.png";
import delivered from "/delivered.png";
import delivering from "/delivering.png";
import payment from "/payment.png";
import pending from "/pending.png";
import returned from "/returned.png";
import shipping from "/shipping.png";
import warehouse from "/warehouse.png";

// Load order data from localStorage or fallback to initial orderData
const getOrderData = () => {
  const savedOrders = localStorage.getItem("orderData");
  return savedOrders ? JSON.parse(savedOrders) : [];
};

const OrderDetail = () => {
  const { state } = useLocation();
  const { order } = state || {};
  const navigate = useNavigate();

  // Check if order exists before rendering
  if (!order) {
    return <p>Loading...</p>;
  }

  const [newStatus, setNewStatus] = useState(order.status || "Pending");
  const [books, setBooks] = useState(order.books); // Maintain state for books with quantities

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSave = () => {
    // Load existing orders from localStorage
    const orders = getOrderData();

    // Update the status of the current order
    const updatedOrders = orders.map((o) => {
      if (o.id === order.id) {
        return { ...o, status: newStatus, books }; // Save the updated books as well
      }
      return o;
    });

    // Save the updated orders back to localStorage
    localStorage.setItem("orderData", JSON.stringify(updatedOrders));

    // Navigate back to the orders page
    navigate("/order", { state: { updatedOrders } });
  };

  const getStatusImage = (status) => {
    switch (status) {
      case "Cancelled":
        return cancel;
      case "Completed":
        return complete;
      case "Delivered":
        return delivered;
      case "Delivering":
        return delivering;
      case "Payment Pending":
        return payment;
      case "Pending":
        return pending;
      case "Returned":
        return returned;
      case "Shipping":
        return shipping;
      case "In Warehouse":
        return warehouse;
      default:
        return pending;
    }
  };

  // Handle change in book quantity
  const handleQuantityChange = (bookId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative or zero quantity

    const updatedBooks = books.map((book) =>
      book.bookId === bookId ? { ...book, quantity: newQuantity } : book
    );

    setBooks(updatedBooks); // Update the state with the new book quantities
  };

  // Calculate total price for the order and apply discount if available
  const calculateTotalPrice = () => {
    let total = books.reduce((acc, book) => acc + book.pricePerUnit * book.quantity, 0);

    if (order.discount) {
      total -= total * (order.discount / 100); // Apply discount percentage
    }

    return total.toFixed(2); // Return the total price with two decimal places
  };

  return (
    <div className="order-detail-container">
      <div className="header-container">
        <button className="back-button" onClick={() => navigate("/order")}>
          <img src={back} alt="back" className="back-image" />
          Back to Order
        </button>
        <h1>Order Status</h1>
      </div>

      <div className="order-detail-wrapper">
        {/* Order Details */}
        <div className="order-detail-section">
          <img src={getStatusImage(newStatus)} alt="Order Status" className="status-image" />
          <div className="order-detail-content">
            <p><strong>Purchase ID:</strong> {order.id}</p>
            <p><strong>Full Name:</strong> {order.fullName}</p>
            <p><strong>Mobile:</strong> {order.mobile}</p>
            <p><strong>Total:</strong> RM {calculateTotalPrice()}</p>
            <p><strong>Payment Type:</strong> {order.paymentType}</p>
            <div className="status-container">
              <label htmlFor="status"><strong>Order Status:</strong></label>
              <select
                id="status"
                value={newStatus}
                onChange={handleStatusChange}
                className="status-select"
              >
                <option value="Pending">Pending</option>
                <option value="Shipping">Shipping</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Returned">Returned</option>
                <option value="In Warehouse">In Warehouse</option>
                <option value="Delivering">Delivering</option>
                <option value="Payment Pending">Payment Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Discount section */}
            {order.discount && (
              <p><strong>Discount Applied:</strong> {order.discount}%</p>
            )}
            <button className="back-button" onClick={handleSave}>Save Changes</button>
          </div>
        </div>

        {/* Book Details Table */}
        <div className="book-details">
          <table>
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Book Name</th>
                <th>Price Per Unit</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.bookId}>
                  <td>{book.bookId}</td>
                  <td>{book.bookName}</td>
                  <td>RM {book.pricePerUnit}</td>
                  <td>
                    <input
                      type="number"
                      value={book.quantity}
                      onChange={(e) => handleQuantityChange(book.bookId, parseInt(e.target.value))}
                      min="1"
                      className="quantity-input"
                    />
                  </td>
                  <td>RM {book.pricePerUnit * book.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;