import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './style.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import TestHome from './pages/TestHome';
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [username, setAuthUsername] = useState("qwe");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setAuthUsername={setAuthUsername} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/testhome" element={<TestHome loggedIn={loggedIn} username={username} />} />
      </Routes>
    </Router>
  );
}

export default App;