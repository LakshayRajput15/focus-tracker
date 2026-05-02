import { useState } from "react";

export default function Login({ setUser }) {
  const [name, setName] = useState("");

  const handleLogin = () => {
    localStorage.setItem("user", name);
    setUser(name);
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Enter name"
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}