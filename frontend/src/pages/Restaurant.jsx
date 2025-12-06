// src/pages/Restaurant.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { CartContext } from "../context/CartContext";

export default function Restaurant() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await api.get(`/restaurants/${id}`);
        setRestaurant(r.data.restaurant || r.data);
        const m = await api.get(`/restaurants/${id}/menu`);
        setMenu(m.data.items || m.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [id, setRestaurant, setMenu]);

  const handleAdd = async (itemId) => {
    try {
      await addToCart(itemId, 1);
      alert("Added to cart");
    } catch (err) {
      alert("Error adding to cart — log in first");
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h2>{restaurant?.name}</h2>
      <div className="card">
        <div className="small">{restaurant?.address}</div>
        <div style={{ marginTop: 12 }}>
          <h3>Menu</h3>
          {menu.map(it => (
            <div className="menu-item" key={it._id || it.id}>
              <div>
                <div style={{ fontWeight: 700 }}>{it.name}</div>
                <div className="small">{it.description || ""}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700 }}>₹{it.price}</div>
                <button className="btn" onClick={() => handleAdd(it._id || it.id)} style={{ marginTop: 8 }}>
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
