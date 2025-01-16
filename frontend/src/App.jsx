import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './style.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProductPage from './pages/ProductPage'; // Adjust the path to your component
import CardDetailsPage from './pages/CardDetailsPage';
import Cart from "./pages/Cart/Cart"
import PurchaseRecord from './pages/PurchaseRecord';
import Order from './pages/Admin/Order';
import OrderDetail from './components/OrderDetail'
import Inventory from './pages/Admin/Inventory';
import Home from './pages/Home';
import HomeAdmin from './pages/Admin/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/order" element={<Order />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/books" element={<ProductPage />} />
        <Route path="/book/details" element={<CardDetailsPage />} />
        <Route path="/view-my-cart" element={<Cart userID={1}/>} />
        <Route path="/purchase-record" element={<PurchaseRecord userID={1}/>} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </Router>
  );
}

export default App;
