import React, { useState } from "react";
import Sidebar from "../../components/AdminSidebar/Sidebar";
import "./Order.css";

// Sample orders with more detailed statuses
const orders = [
  { id: 1, fullName: "WUN LIM", mobile: "+60 11223344", total: 300, paymentType: "Credit Card", status: "In Warehouse" },
  { id: 2, fullName: "WUN LIM", mobile: "+60 11223344", total: 300, paymentType: "Cash", status: "Delivering" },
  { id: 3, fullName: "SCRUM MASTER", mobile: "+60 11223344", total: 300, paymentType: "Bank Transfer", status: "Completed" },
  { id: 4, fullName: "SCRUM MASTER", mobile: "+60 11220099", total: 450, paymentType: "Credit Card", status: "Completed" },
  { id: 5, fullName: "JOHN DOE", mobile: "+60 11223345", total: 500, paymentType: "Debit Card", status: "In Warehouse" },
  { id: 6, fullName: "JANE DOE", mobile: "+60 11223346", total: 200, paymentType: "Cash", status: "Delivering" },
  { id: 7, fullName: "ALICE", mobile: "+60 11223347", total: 350, paymentType: "PayPal", status: "Completed" },
  { id: 8, fullName: "BOB", mobile: "+60 11223348", total: 600, paymentType: "Bank Transfer", status: "Payment Pending" },
  { id: 9, fullName: "CHARLIE", mobile: "+60 11223349", total: 400, paymentType: "Credit Card", status: "In Warehouse" },
  { id: 10, fullName: "DAVE", mobile: "+60 11223350", total: 450, paymentType: "Debit Card", status: "Delivering" },
  { id: 11, fullName: "EVA", mobile: "+60 11223351", total: 550, paymentType: "Bank Transfer", status: "Completed" },
  { id: 12, fullName: "FAY", mobile: "+60 11223352", total: 600, paymentType: "PayPal", status: "Payment Pending" },
  { id: 13, fullName: "GRACE", mobile: "+60 11223353", total: 300, paymentType: "Credit Card", status: "In Warehouse" },
  { id: 14, fullName: "HANK", mobile: "+60 11223354", total: 400, paymentType: "Cash", status: "Delivering" },
  { id: 15, fullName: "IVY", mobile: "+60 11223355", total: 250, paymentType: "Bank Transfer", status: "Completed" },
  { id: 16, fullName: "JACK", mobile: "+60 11223356", total: 300, paymentType: "Debit Card", status: "Payment Pending" },
  { id: 17, fullName: "KARA", mobile: "+60 11223357", total: 350, paymentType: "Credit Card", status: "In Warehouse" },
  { id: 18, fullName: "LEO", mobile: "+60 11223358", total: 500, paymentType: "PayPal", status: "Delivering" },
  { id: 19, fullName: "MIA", mobile: "+60 11223359", total: 600, paymentType: "Bank Transfer", status: "Completed" },
  { id: 20, fullName: "NOAH", mobile: "+60 11223360", total: 450, paymentType: "Credit Card", status: "Payment Pending" },
  { id: 21, fullName: "OLIVER", mobile: "+60 11223361", total: 300, paymentType: "Cash", status: "In Warehouse" },
  { id: 22, fullName: "PARKER", mobile: "+60 11223362", total: 350, paymentType: "Debit Card", status: "Delivering" },
  { id: 23, fullName: "QUINN", mobile: "+60 11223363", total: 500, paymentType: "Bank Transfer", status: "Completed" },
  { id: 24, fullName: "RILEY", mobile: "+60 11223364", total: 250, paymentType: "PayPal", status: "Payment Pending" }
];

const chunkOrders = (orders, chunkSize) => {
  const result = [];
  for (let i = 0; i < orders.length; i += chunkSize) {
    result.push(orders.slice(i, i + chunkSize));
  }
  return result;
};

const Order = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [currentChunk, setCurrentChunk] = useState(0); // Manage the current chunk state

  // Filter orders based on the search query
  const filteredOrders = orders.filter(
    (order) =>
      order.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.mobile.includes(searchQuery)
  );

  const chunkedOrders = chunkOrders(filteredOrders, 8); // Split filtered orders into chunks of 8

  return (
    <div className="order-container">
      <Sidebar />
      <main className="order-content">
        <div className="header">
          <h1>Orders</h1>
          <input
            type="text"
            placeholder="Search by name or mobile"
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
                  <th>Purchase ID</th>
                  <th>Full Name</th>
                  <th>Mobile</th>
                  <th>Total</th>
                  <th>Payment Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {chunkedOrders[currentChunk].map((order) => (
                  <tr key={order.id}>
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