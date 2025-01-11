import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
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

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSave = () => {
    // Load existing orders from localStorage
    const orders = getOrderData();

    // Update the status of the current order
    const updatedOrders = orders.map((o) => {
      if (o.id === order.id) {
        return { ...o, status: newStatus };
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

  return (
    <div className="order-detail-container">
      <div className="header-container">
        <button className="back-button" onClick={() => navigate("/order")}>
          <img src={back} alt="back" className="back-image" />
          Back to Order
        </button>
        <h1>Order Status</h1>
      </div>

      <div className="order-detail-section">
        {/* Left Side: Order Details */}
        <div className="order-detail-content">
            <p><strong>Purchase ID:</strong> {order.id}</p>
            <p><strong>Full Name:</strong> {order.fullName}</p>
            <p><strong>Mobile:</strong> {order.mobile}</p>
            <p><strong>Total:</strong> RM {order.total}</p>
            <p><strong>Payment Type:</strong> {order.paymentType}</p>
            <p><strong>Status:</strong> {newStatus}</p>
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
            <button className="back-button" onClick={handleSave}>Save Changes</button>
        </div>

        {/* Right Side: Status Image */}
        <img src={getStatusImage(newStatus)} alt="Order Status" className="status-image" />
        </div>
    </div>
  );
};

export default OrderDetail;