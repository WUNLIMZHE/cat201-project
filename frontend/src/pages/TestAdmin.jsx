// import React, { useState } from 'react';
// import './Login.css';


// const TestAdmin = () => {
//     const [view, setView] = useState('orderList');
//     const [selectedOrder, setSelectedOrder] = useState(null);

//     const orders = [
//         { id: 1, status: 'Shipped', paymentDetails: 'Paid via PayPal' },
//         { id: 2, status: 'Processing', paymentDetails: 'Paid via Credit Card' },
//         // ...other orders
//     ];

//     const handleOrderClick = (order) => {
//         setSelectedOrder(order);
//         setView('orderDetails');
//     };

//     const renderOrderList = () => (
//         <div>
//             <h2>Order List</h2>
//             <ul>
//                 {orders.map(order => (
//                     <li key={order.id} onClick={() => handleOrderClick(order)}>
//                         Order #{order.id}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );

//     const renderOrderDetails = () => (
//         <div>
//             <h2>Order Details</h2>
//             <p>Status: {selectedOrder.status}</p>
//             <p>Payment Details: {selectedOrder.paymentDetails}</p>
//             <button onClick={() => setView('orderList')}>Back to Order List</button>
//         </div>
//     );

//     return (
//         <div>
//             <h1>Admin Page</h1>
//             {view === 'orderList' ? renderOrderList() : renderOrderDetails()}
//         </div>
//     );
// };

// export default TestAdmin;
