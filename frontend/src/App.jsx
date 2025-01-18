import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './style.css';
import Home from "./pages/Home"
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProductPage from './pages/ProductPage'; // Adjust the path to your component
import CardDetailsPage from './pages/CardDetailsPage';
import Cart from "./pages/Cart/Cart";
import PurchaseRecord from './pages/PurchaseRecord';
import Order from './pages/Admin/Order';
import OrderDetail from './components/OrderDetail';
import Inventory from './pages/Admin/Inventory';
import EditProfile from './pages/EditProfile';
import AddBook from "./pages/Admin/AddBook"
import UserProfile from './pages/UserProfile';
import PaymentCard from './components/User/PaymentCard';
import AddressCard from './components/User/AddressCard';

import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [username, setAuthUsername] = useState("user1");
  const [purchaseID, setPurchaseID] = useState(null);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/admin" element={<HomeAdmin />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/book/details" element={<CardDetailsPage />} />
          <Route path="/view-my-cart" element={<Cart userID={1} />} />
          <Route path="/purchase-record" element={<PurchaseRecord userID={1} />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/" element={<Navigate to="/testhome" />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setAuthUsername={setAuthUsername} />} />
          <Route path="/editprofile" element={<EditProfile loggedIn={loggedIn} username={username} />} />
          <Route path="/userprofile" element={<UserProfile loggedIn={loggedIn} username={username} />} />
          <Route path="/editpayment" element={<PaymentCard loggedIn={loggedIn} username={username} />} />
          <Route path="/editaddress" element={<AddressCard loggedIn={loggedIn} username={username} />} />
          <Route path="/admin-add-book" element={<AddBook />} />

          {/* User */}
          <Route path="/books" element={<ProductPage />} />
          <Route path="/view-my-cart" element={<Cart userID={1} />} />
          <Route path="/book/details" element={<CardDetailsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/purchaserecord" element={<PurchaseRecord />} />
          <Route path="/product/:id" element={<CardDetailsPage />} />
          <Route path="/userprofile" element={<UserProfile />} />

          {/* Admin */}
          <Route path="/order" element={<Order setPurchaseID = {setPurchaseID} />} />
          <Route path="/purchase-record" element={<PurchaseRecord userID={1} />} />
          <Route path="/order/:purchaseID" element={<OrderDetail purchaseID = {purchaseID} />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;