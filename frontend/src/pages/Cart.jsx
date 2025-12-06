// src/pages/Cart.jsx
import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, clearCart } = useContext(CartContext);
  const [address, setAddress] = useState("");
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate();

  const placeOrder = async () => {
    if (!cart || !cart.items || cart.items.length === 0) {
      alert("Cart empty");
      return;
    }
    setPlacing(true);
    try {
      // derive restaurant from first item (stored in cart.items restaurant references)
      // For simplicity we expect cart.items[0].menuItem.restaurant exists
      const firstMenuItem = cart.items[0].menuItem;
      const restaurant = firstMenuItem.restaurant || (cart.restaurant || null);

      // fallback: ask user to pick a restaurant (simpler apps may store cart per restaurant)
      const payload = { restaurant: restaurant, address };
      const res = await api.post("/orders", payload);
      await clearCart();
      alert("Order placed!");
      navigate("/orders");
    } catch (err) {
      alert("Order failed");
      console.error(err);
    } finally {
      setPlacing(false);
    }
  };

  const total = (cart?.items || []).reduce((acc, it) => {
    const price = (it.menuItem?.price || 0);
    return acc + price * (it.qty || 1);
  }, 0);

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Your Cart</h2>
      <div className="card">
        {cart?.items?.length ? (
          <>
            {cart.items.map(it => (
              <div className="cart-item" key={it.menuItem._id || it.menuItem.id}>
                <div>
                  <div style={{ fontWeight: 700 }}>{it.menuItem.name}</div>
                  <div className="small">Qty: {it.qty}</div>
                </div>
                <div>₹{(it.menuItem.price * it.qty).toFixed(0)}</div>
              </div>
            ))}

            <div style={{ marginTop: 12, fontWeight: 700 }}>Total: ₹{total.toFixed(0)}</div>

            <div style={{ marginTop: 12 }}>
              <div className="form-row">
                <label>Delivery Address</label>
                <textarea value={address} onChange={e => setAddress(e.target.value)} />
              </div>
              <button className="btn" onClick={placeOrder} disabled={placing}>
                {placing ? "Placing..." : "Place Order"}
              </button>
            </div>
          </>
        ) : (
          <div>Your cart is empty.</div>
        )}
      </div>
    </div>
  );
}
