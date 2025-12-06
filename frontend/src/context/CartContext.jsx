// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await api.get("/cart");
      setCart(res.data.cart || null);
    } catch (err) {
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchCart();
    else setCart(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const addToCart = async (menuItemId, qty = 1) => {
    const res = await api.post("/cart", { menuItem: menuItemId, qty });
    setCart(res.data.cart);
    return res.data;
  };

  const clearCart = async () => {
    await api.delete("/cart");
    setCart(null);
  };

  return (
    <CartContext.Provider value={{ cart, loading, fetchCart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
