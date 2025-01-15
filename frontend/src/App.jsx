import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './style.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProductPage from './pages/ProductPage'; // Adjust the path to your component
import CardDetailsPage from './pages/CardDetailsPage';
import Cart from "./pages/Cart/Cart"
import PurchaseRecord from './pages/PurchaseRecord';
import TestHome from './pages/TestHome';
import TestAdmin from './pages/TestAdmin';
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setAuthUsername] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/testhome" />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setAuthUsername={setAuthUsername} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
