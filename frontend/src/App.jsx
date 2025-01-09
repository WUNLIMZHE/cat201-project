import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './style.css';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;