import { useState } from "react";

export default function Login({ setUser }) {
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (!name) return;
    localStorage.setItem("user", name);
    setUser(name);
  };

  return (
    <div className="container">
      <h2>🔐 Login</h2>

      <input
        placeholder="Enter your name"
        onChange={(e) => setName(e.target.value)}
      />

      <br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}