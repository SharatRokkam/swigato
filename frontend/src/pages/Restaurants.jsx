// src/pages/Restaurants.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Restaurants() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/restaurants");
      setList(res.data.restaurants || res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(()=>{ load(); }, []);

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Restaurants</h2>
      <div className="grid">
        {loading ? <div>Loading...</div> : list.map(r => (
          <div className="card restaurant" key={r._id || r.id}>
            <div style={{fontWeight:700}}>{r.name}</div>
            <div className="small">{r.cuisine} • Rating: {r.rating || "—"}</div>
            <div style={{ marginTop: 8 }}>
              <Link to={`/restaurant/${r._id || r.id}`}>View Menu</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
