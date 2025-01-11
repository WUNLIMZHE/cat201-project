import { useLocation, useNavigate } from "react-router-dom";
import "./OrderDetail.css"; // Ensure this is imported

const OrderDetail = () => {
  const { state } = useLocation();
  const { order } = state; // Access the passed order data
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="order-detail-container">
      <h1>Order Detail</h1>
      <div className="order-detail-section">
        <p><strong>Purchase ID:</strong> {order.id}</p>
        <p><strong>Full Name:</strong> {order.fullName}</p>
        <p><strong>Mobile:</strong> {order.mobile}</p>
        <p><strong>Total:</strong> RM {order.total}</p>
        <p><strong>Payment Type:</strong> {order.paymentType}</p>
        <p><strong>Status:</strong> {order.status}</p>
      </div>

      <button className="back-button" onClick={() => navigate("/order")}>Back to Order</button>
    </div>
  );
};

export default OrderDetail;