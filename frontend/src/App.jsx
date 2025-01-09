import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './style.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import TestHome from './pages/TestHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/testhome" element={<TestHome />} />
      </Routes>
    </Router>
  );
}

export default App;