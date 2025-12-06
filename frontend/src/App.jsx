// src/App.jsx
import React, { useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Restaurants from "./pages/Restaurants";
import Restaurant from "./pages/Restaurant";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CartPage from "./pages/Cart";
import Orders from "./pages/Orders";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Restaurants />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<div className="card">Page not found — <Link to="/">Home</Link></div>} />
        </Routes>
      </div>
    </>
  );
}
