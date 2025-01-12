import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './style.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProductPage from './pages/ProductPage'; // Adjust the path to your component
<<<<<<< HEAD
import CardDetailsPage from './pages/CardDetailsPage';
=======
>>>>>>> 978967a878519044df9e6b24bbbfed86b9a1e45b

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/books" element={<ProductPage />} />
<<<<<<< HEAD
        <Route path="/book/details" element={<CardDetailsPage />} />
=======
>>>>>>> 978967a878519044df9e6b24bbbfed86b9a1e45b
      </Routes>
    </Router>
  );
}

export default App;
