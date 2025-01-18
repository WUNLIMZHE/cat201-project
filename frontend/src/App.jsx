import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './style.css';
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
import TestAdmin from './pages/TestAdmin';
import UserProfile from './pages/UserProfile';
import PaymentCard from './components/User/PaymentCard';
import AddressCard from './components/User/AddressCard';
 
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [username, setAuthUsername] = useState("user1");

  return (
    <Router>
      <Routes>
        {/* alluser */}
        <Route path="/" element={<Navigate to="/testhome" />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setAuthUsername={setAuthUsername} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/editprofile" element={<EditProfile loggedIn={loggedIn} username={username} />} />
        <Route path="/userprofile" element={<UserProfile loggedIn={loggedIn} username={username}/>} />
        <Route path="/editpayment" element={<PaymentCard loggedIn={loggedIn} username={username} />} />
        <Route path="/editaddress" element={<AddressCard loggedIn={loggedIn} username={username} />} />
        <Route path="/testadmin" element={<TestAdmin />} />

        {/* User */}
        <Route path="/books" element={<ProductPage />} />
        <Route path="/view-my-cart" element={<Cart userID={1} />} />
        <Route path="/book/details" element={<CardDetailsPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/purchaserecord" element={<PurchaseRecord />} />
        <Route path="/product/:id" element={<CardDetailsPage />} />
        <Route path="/userprofile" element={<UserProfile />} />
        
        {/* Admin */}
        <Route path="/order" element={<Order />} />
        <Route path="/purchase-record" element={<PurchaseRecord userID={1} />} />
        <Route path="/order/:purchaseID" element={<OrderDetail />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </Router>
  );
}

export default App;