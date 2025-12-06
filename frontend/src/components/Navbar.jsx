// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const doLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="nav">
      <div>
        <Link to="/" style={{ fontWeight: 700, fontSize: 18, marginRight: 12 }}>🍽 FoodDelivery</Link>
        <Link to="/">Restaurants</Link>
      </div>

      <div>
        {user ? (
          <>
            <Link to="/orders" style={{ marginRight: 12 }}>Orders</Link>
            <Link to="/cart" style={{ marginRight: 12 }}>
              Cart ({cart?.items?.length || 0})
            </Link>
            <span style={{ marginRight: 12 }}>{user.name}</span>
            <button className="btn" onClick={doLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: 12 }}>Login</Link>
            <Link to="/signup" className="btn">Sign up</Link>
          </>
        )}
      </div>
    </div>
  );
}
