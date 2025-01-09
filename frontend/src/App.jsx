// import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home"
import CardDetailsPage from "./pages/CardDetailsPage"
import "./App.css";
import AdminPage from "./pages/AdminPage";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<CardDetailsPage />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
