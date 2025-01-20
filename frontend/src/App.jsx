import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./style.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProductPage from "./pages/ProductPage";
import CardDetailsPage from "./pages/CardDetailsPage";
import Cart from "./pages/Cart/Cart";
import PurchaseRecord from "./pages/PurchaseRecord";
import Order from "./pages/Admin/Order";
import OrderDetail from "./components/OrderDetail";
import Inventory from "./pages/Admin/Inventory";
import Stock from "./pages/Admin/Stock";
import EditProfile from "./pages/EditProfile";
import AddBook from "./pages/Admin/AddBook";
import UserProfile from "./pages/UserProfile";
import PaymentCard from "./components/User/PaymentCard";
import AddressCard from "./components/User/AddressCard";

import { useState, useEffect } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [username, setAuthUsername] = useState("");
  const [purchaseID, setPurchaseID] = useState(null);
  const [userID, setUserID] = useState(0);
  const [role, setRole] = useState("user"); //user or admin
  const [address, setAddresses] = useState("");

  localStorage.setItem("userID", userID);
  localStorage.setItem("role", role);
  localStorage.setItem("address", address);

  const handleSuccessfulLogin = (id, role, address) => {
    setUserID(id);
    setRole(role);
    setAddresses(address);
    
    localStorage.setItem("userID", id);
    localStorage.setItem("userRole", role);
    localStorage.setItem("address", address);
  };
  
  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    const storedRole = localStorage.getItem("userRole");
    const storedAddress = localStorage.getItem("address");
    
    if (storedUserID && storedRole) {
      setUserID(storedUserID);
      setRole(storedRole);
      setAddresses(storedAddress);
    }
  }, []);

  // console.log(localStorage.getItem("userID")); // Check the raw value in localStorage

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home userID={userID} role={role} />} />
          {/* <Route path="/admin" element={<HomeAdmin />} /> */}
          <Route
            path="/signup"
            element={<Signup handleSuccessfulLogin={handleSuccessfulLogin} />}
          />
          {/* <Route path="/book/details" element={<CardDetailsPage userID={userID} role={role}/>} /> */}
          {/* <Route path="/view-my-cart" element={<Cart userID={userID} role={role}/>} /> */}
          {/* <Route
            path="/purchase-record"
            element={<PurchaseRecord userID={userID} role={role} />}
          /> */}
          <Route path="/orders/:id" element={<OrderDetail />} />
          {/* <Route path="/" element={<Navigate to="/testhome" />} /> */}
          <Route
            path="/login"
            element={
              <Login
                setLoggedIn={setLoggedIn}
                setAuthUsername={setAuthUsername}
                handleSuccessfulLogin={handleSuccessfulLogin}
              />
            }
          />
          <Route
            path="/editprofile"
            element={(Number(localStorage.getItem("userID")) === 0 ||
              !localStorage.getItem("userID")) &&
            localStorage.getItem("role") === "user" ? (
              <Home />
            ) : (<EditProfile loggedIn={loggedIn} username={username} />)}
          />
          <Route
            path="/userprofile"
            element={(Number(localStorage.getItem("userID")) === 0 ||
              !localStorage.getItem("userID")) &&
            localStorage.getItem("role") === "user" ? (
              <Home />
            ) : (<UserProfile loggedIn={loggedIn} username={username} />)}
          />
          <Route
            path="/editpayment"
            element={
              (Number(localStorage.getItem("userID")) === 0 ||
                !localStorage.getItem("userID")) &&
              localStorage.getItem("role") === "user" ? (
                <Home />
              ) : (
                <PaymentCard loggedIn={loggedIn} username={username} />
              )
            }
          />
          <Route
            path="/editaddress"
            element={
              (Number(localStorage.getItem("userID")) === 0 ||
                !localStorage.getItem("userID")) &&
              localStorage.getItem("role") === "user" ? (
                <Home />
              ) : (
                <AddressCard loggedIn={loggedIn} username={username} />
              )
            }
          />
          <Route path="/admin-add-book" element={(Number(localStorage.getItem("userID")) === 0 ||
                !localStorage.getItem("userID")) ||
              localStorage.getItem("role") === "user" ? (
                <Home />
              ) : (<AddBook userID={userID} />)} />

          {/* User */}
          <Route
            path="/books"
            element={<ProductPage userID={userID} role={role} />}
          />
          <Route
            path="/view-my-cart"
            element={
              Number(localStorage.getItem("userID")) === 0 ||
              !localStorage.getItem("userID") ? (
                <Home />
              ) : (
                <Cart userID={userID} address={address} role={role} />
              )
            }
          />
          <Route
            path="/book/details"
            element={<CardDetailsPage userID={userID} role={role} />}
          />
          {/* <Route
            path="/cart"
            element={
              Number(localStorage.getItem("userID")) === 0 ||
              !localStorage.getItem("userID") ? (
                <Home />
              ) : (
                <Cart userID={userID} address={address} role={role} />
              )
            }
          /> */}
          <Route
            path={`/purchase-record`}
            element={
              (Number(localStorage.getItem("userID")) === 0 ||
                !localStorage.getItem("userID")) &&
              localStorage.getItem("role") === "user" ? (
                <Home />
              ) : (
                <PurchaseRecord userID={userID} />
              )
            }
          />
          <Route
            path="/product/:id"
            element={
              Number(localStorage.getItem("userID")) === 0 ||
                !localStorage.getItem("userID") &&
              localStorage.getItem("role") === "user" ? (
                <Home />
              ) : (
                <CardDetailsPage />
              )
            }
          />
          {/* <Route
            path="/userprofile"
            element={
              Number(localStorage.getItem("userID")) === 0 ||
              !localStorage.getItem("userID") ||
              localStorage.getItem("role") !== "user" ? (
                <Home />
              ) : (
                <UserProfile />
              )
            }
          /> */}

          {/* Admin */}
          <Route
            path="/order"
            element={
              Number(localStorage.getItem("userID")) === 0 ||
                !localStorage.getItem("userID") &&
              localStorage.getItem("role") === "admin" ? (
                <Home />
              ) : (
                <Order setPurchaseID={setPurchaseID} />
              )
            }
          />
          {/* <Route path="/purchase-record" element={<PurchaseRecord />} /> */}
          <Route
            path="/order/:purchaseID"
            element={<OrderDetail purchaseID={purchaseID} />}
          />
          <Route
            path="/inventory"
            element={
              Number(localStorage.getItem("userID")) === 0 ||
              !localStorage.getItem("userID")  &&
              localStorage.getItem("role") === "admin" ? (
                <Home />
              ) : (
                <Stock />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
