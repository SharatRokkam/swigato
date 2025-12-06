// src/pages/Signup.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      // after registering auto-login (call login manually or navigate to login)
      navigate("/login");
    } catch (error) {
      setErr(error?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="card container" style={{ marginTop: 20 }}>
      <h2>Sign up</h2>
      {err && <div style={{ color: "red" }}>{err}</div>}
      <form onSubmit={submit}>
        <div className="form-row">
          <label>Name</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Email</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="form-row">
          <label>Password</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <button className="btn">Create account</button>
      </form>
    </div>
  );
}
