import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/AdminSidebar/Sidebar";
import "./Order.css";
import orders from "../../data/orderData"
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
  const navigate = useNavigate();

  const filteredOrders = orders.filter(
    (order) =>
      order.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.mobile.includes(searchQuery) ||
      order.id.toString().includes(searchQuery)
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
              <button onClick={() => setCurrentChunk(currentChunk - 1)} disabled={currentChunk === 0}>
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
                  <th>Full Name</th>
                  <th>Mobile</th>
                  <th>Total</th>
                  <th>Payment Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {chunkedOrders[currentChunk].map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => navigate(`/orders/${order.id}`, { state: { order } })}
                    className="clickable-row"
                  >
                    <td>{order.id}</td>
                    <td>{order.fullName}</td>
                    <td>{order.mobile}</td>
                    <td>RM {order.total}</td>
                    <td>{order.paymentType}</td>
                    <td>{order.status}</td>
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