import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './style.css';
import Home from "./pages/Home"
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProductPage from './pages/ProductPage'; // Adjust the path to your component
import CardDetailsPage from './pages/CardDetailsPage';
import Cart from "./pages/Cart/Cart"
import PurchaseRecord from './pages/PurchaseRecord';
import Order from './pages/Admin/Order';
import OrderDetail from './components/OrderDetail'
import Inventory from './pages/Admin/Inventory';
import Stock from './pages/Admin/Stock';
import TestHome from './pages/TestHome';
import TestAdmin from './pages/TestAdmin';
import AddBook from "./pages/Admin/AddBook"
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setAuthUsername] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/admin" element={<HomeAdmin />} /> */}
        <Route path="/order" element={<Order />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/books" element={<ProductPage />} />
        <Route path="/book/details" element={<CardDetailsPage />} />
        <Route path="/view-my-cart" element={<Cart userID={1}/>} />
        <Route path="/purchase-record" element={<PurchaseRecord userID={1}/>} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/" element={<Navigate to="/testhome" />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setAuthUsername={setAuthUsername} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/testhome" element={<TestHome loggedIn={loggedIn} username={username} />} />
        <Route path="/testadmin" element={<TestAdmin />} />
        <Route path="/admin-add-book" element={<AddBook />} />
      </Routes>
    </Router>
  );
}

export default App;
