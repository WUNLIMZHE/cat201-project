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
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentChunk, setCurrentChunk] = useState(0);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const ordersResponse = await handleApiCall("admin/getorderdetails", "GET", {});
      const usersResponse = await handleApiCall("admin/getuserdetails", "GET", {});

      if (!ordersResponse || !ordersResponse.ok || !usersResponse || !usersResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const orders = await ordersResponse.json();
      const users = await usersResponse.json();

      const ordersWithUserDetails = orders.map(order => {
        const user = users.find(user => user.userID === order.userID);
        return {
          ...order,
          username: user ? user.username : "Unknown",
          phone: user ? user.phoneNumber : "Unknown"
        };
      });

      setOrders(ordersWithUserDetails);
    } catch (error) {
      console.error("Error fetching orders: " + error);
      setError("Error fetching orders: " + error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []); // Add dependency array to ensure fetchOrders is called only once

  const filteredOrders = orders.filter(
    (order) =>
      order.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery) ||
      order.purchaseID.toString().includes(searchQuery)
  );

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
                  <th>Username</th>
                  <th>Phone</th>
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
                    <td>{order.username}</td>
                    <td>{order.phone}</td>
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