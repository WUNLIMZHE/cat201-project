/* eslint-disable no-unused-vars */
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
  const { state } = useLocation();
  const { order } = state || {};
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    fetch("/api/admin/getorderdetails")
      .then((response) => response.json())
      .then((data) => {
        const orderDetail = data.find((o) => o.purchaseID === order.id);
        setOrderDetails(orderDetail);
      });
  }, [order.id]);

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
          <div className="order-detail-content">
            <p><strong>Purchase ID:</strong> {orderDetails.purchaseID}</p>
            <p><strong>Full Name:</strong> {orderDetails.fullName}</p>
            <p><strong>Mobile:</strong> {orderDetails.mobile}</p>
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
            <button className="back-button" >Save Changes</button>
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
                      min="1"
                      className="quantity-input"
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