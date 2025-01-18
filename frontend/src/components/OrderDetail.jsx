/* eslint-disable no-unused-vars */
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import handleApiCall from '../utils/handleApiCall';
import "./OrderDetail.css"; // Ensure this is imported
import cancel from "../assets/images/cancelled.png";
import complete from "../assets/images/completed.png";
import delivered from "../assets/images/delivered.png";
import delivering from "../assets/images/delivering.png";
import payment from "../assets/images/payment.png";
import pending from "../assets/images/pending.png";
import returned from "../assets/images/returned.png";
import shipping from "../assets/images/shipping.png";
import warehouse from "../assets/images/warehouse.png";
import back from "../assets/images/back.webp";

const OrderDetail = () => {
  // console.log("purchaseID: " + useParams().purchaseID);
  const { purchaseID } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState("");

  const fetchOrderDetails = async () => {
    await handleApiCall(
      `admin/getdetails`,
      "GET",
      { purchaseID },
      async (response) => {
        setOrderDetails(response);
      },
      (error) => {
        setError(error);
      }
    );
  };

  useEffect(() => {

    if (purchaseID) {
      fetchOrderDetails();
    } else {
      setError("Purchase ID is missing");
    }
  }, [purchaseID]);

  const handleQuantityChange = (bookId, newQuantity) => {
    setOrderDetails((prevDetails) => {
      const updatedBooks = prevDetails.books.map((book) => {
        if (book.id === bookId) {
          return { ...book, purchaseUnit: newQuantity, totalPrice: book.price * newQuantity };
        }
        return book;
      });
      const newTotalAmount = updatedBooks.reduce((total, book) => total + book.totalPrice, 0);
      return { ...prevDetails, books: updatedBooks, totalAmount: newTotalAmount };
    });
  };

  const updateQuantity = async (purchaseID, bookId, newQuantity) => {
    await handleApiCall(
      `admin/updatequantity`,
      "POST",
      { purchaseID, bookId, newQuantity },
      async (response) => {
        console.log("PASS: " + bookId)
        fetchOrderDetails();
      },
      (error) => {
        setError(error);
      }
    );
  };

  const updateOrderStatus = async (purchaseID, purchaseStatus) => {
      await handleApiCall(
        `admin/update`,
        "POST",
        { purchaseID, purchaseStatus },
        async (response) => {
          console.log("PASS: " + purchaseID)
          navigate("/order");
          if (response.message === "Order status updated successfully") {
            alert("Order status updated successfully");
          }
        },
        (error) => {
          setError(error);
        },
        
        { "Content-Type": "application/json" }
      );
  }
  
  const updateTotalAmount = async (purchaseID, totalAmount) => {
    await handleApiCall(
      `admin/updatetotal`,
      "POST",
      { purchaseID, totalAmount },
      async (response) => {
        console.log("PASS: " + purchaseID)
        fetchOrderDetails();
      },
      (error) => {
        setError(error);
      }
    );
  };

  const handleSaveChanges = async () => {
    for (const book of orderDetails.books) {
      console.log("book id: " + book.id);
      console.log("book quantity: " + book.purchaseUnit);
      // console.log("purchaseID: " + purchaseID);
      await updateQuantity(purchaseID, book.id, book.purchaseUnit);
    }
    updateOrderStatus(purchaseID, orderDetails.purchaseStatus);
    updateTotalAmount(purchaseID, orderDetails.totalAmount);
  }

  const statusImages = {
    "Pending": pending,
    "Shipping": shipping,
    "Delivered": delivered,
    "Cancelled": cancel,
    "Returned": returned,
    "In Warehouse": warehouse,
    "Delivering": delivering,
    "Payment Pending": payment,
    "Completed": complete
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

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
          <img
            src={statusImages[orderDetails.purchaseStatus]}
            alt={orderDetails.purchaseStatus}
            className="status-image align-middle"
          />
          <div className="order-detail-content">
            <p><strong>Purchase ID:</strong> {orderDetails.purchaseID}</p>
            <p><strong>Full Name:</strong> {orderDetails.username}</p>
            <p><strong>Mobile:</strong> {orderDetails.phone}</p>
            <p><strong>Total:</strong> RM {orderDetails.totalAmount}</p>
            <p><strong>Payment Type:</strong> {orderDetails.paymentType}</p>
            <div className="status-container">
              <label htmlFor="status"><strong>Order Status:</strong></label>
              <select
                id="status"
                value={orderDetails.purchaseStatus}
                onChange={(e) => setOrderDetails({ ...orderDetails, purchaseStatus: e.target.value })}
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
            {orderDetails.discount && (
              <p><strong>Discount Applied:</strong> {orderDetails.discount}%</p>
            )}
            <button className="back-button" onClick={handleSaveChanges}>Save Changes</button>
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
              {orderDetails.books.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>RM {book.price}</td>
                  <td>
                    <input
                      type="number"
                      value={book.purchaseUnit}
                      min="0"
                      className="quantity-input"
                      onChange={(e) => handleQuantityChange(book.id, parseInt(e.target.value, 10))}
                    />
                  </td>
                  <td>RM {book.totalPrice}</td>
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