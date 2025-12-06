// src/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const load = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{ load(); }, []);

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Your Orders</h2>
      <div className="card">
        {orders.length === 0 ? <div>No orders</div> : orders.map(o => (
          <div key={o._id || o.id} style={{ marginBottom: 12 }}>
            <div style={{ fontWeight: 700 }}>Order #{o._id?.slice(-6)}</div>
            <div className="small">Status: {o.status}</div>
            <div className="small">Total: ₹{o.totalPrice}</div>
            <div className="small">Placed: {new Date(o.createdAt).toLocaleString()}</div>
            <div style={{ marginTop: 8 }}>
              {o.items.map(it => (
                <div key={it.menuItem._id} className="small">{it.menuItem.name} x{it.qty}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
