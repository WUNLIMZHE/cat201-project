import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/AdminSidebar/Sidebar";
import handleApiCall from "../../utils/handleApiCall";
import "./Order.css";

const chunkOrders = (orders, chunkSize) => {
  const result = [];
  for (let i = 0; i < orders.length; i += chunkSize) {
    result.push(orders.slice(i, i + chunkSize));
  }
  return result;
};

const Order = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentChunk, setCurrentChunk] = useState(0);
  const [purchaseID, setPurchaseID] = useState("");
  const [userID, setUserID] = useState("");
  const [phone, setPhone] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [purchaseStatus, setPurchaseStatus] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    await handleApiCall(
      "admin/getorderdetails",
      "GET",
      null,
      async(response) =>{
        setOrders(response.data);
      },
      (error) => {
        setError(error);
      }
    )
  };

  useEffect(() => {
    fetchOrders();
  }, []); // Add dependency array to ensure fetchOrders is called only once

  const filteredOrders = orders ? orders.filter(
    (order) =>
      order.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery) ||
      order.purchaseID.toString().includes(searchQuery)
  ) : [];

  const chunkedOrders = chunkOrders(filteredOrders, 8);

  return (
    <div className="order-container">
      <Sidebar />
      <main className="order-content">
        <div className="header">
          <h1>Orders</h1>
          <input
            type="text"
            placeholder="Search by purchase id / name / mobile"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
        </div>

        {filteredOrders.length === 0 ? (
          <div className="no-results">No orders found.</div>
        ) : (
          <>
            <div className="pagination">
              <button
                onClick={() => setCurrentChunk(currentChunk - 1)}
                disabled={currentChunk === 0}
              >
                Prev
              </button>
              <button
                onClick={() => setCurrentChunk(currentChunk + 1)}
                disabled={currentChunk === chunkedOrders.length - 1}
              >
                Next
              </button>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>UserID</th>
                  <th>Username</th>
                  <th>Total Amount</th>
                  <th>Payment Method</th>
                  <th>Purchase Status</th>
                </tr>
              </thead>
              <tbody>
                {chunkedOrders[currentChunk].map((order) => (
                  <tr
                    key={order.purchaseID}
                    onClick={() => navigate(`/orders/${order.purchaseID}`, { state: { order } })}
                    className="clickable-row"
                  >
                    <td>{order.purchaseID}</td>
                    <td>{order.userID}</td>
                    <td>{order.username}</td>
                    <td>RM {order.totalAmount}</td>
                    <td>{order.paymentMethod}</td>
                    <td>{order.purchaseStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  );
};

export default Order;