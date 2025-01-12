import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './style.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProductPage from './pages/ProductPage'; // Adjust the path to your component
import CardDetailsPage from './pages/CardDetailsPage';
import Cart from "./pages/Cart/Cart"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/books" element={<ProductPage />} />
        <Route path="/book/details" element={<CardDetailsPage />} />
        <Route path="/view-my-cart" element={<Cart userID={1}/>} />
      </Routes>
    </Router>
  );
}

export default App;
