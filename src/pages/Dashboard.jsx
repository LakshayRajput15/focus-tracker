import { useState, useEffect } from "react";
import Timer from "../components/Timer";
import TaskManager from "../components/TaskManager";
import Stats from "../components/Stats";
import Login from "../components/Login";
import History from "../components/History";

export default function Dashboard() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // 🔐 Login screen
  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <div className="container fade-in">
      
      {/* 🌈 Animated Header */}
      <div style={{ marginBottom: "20px" }}>
        <h1
          className="gradient-text"
          style={{
            margin: 0,
            fontSize: "32px",
            fontWeight: "bold",
          }}
        >
          ⚡ FocusFlow
        </h1>

        <p style={{ margin: 0, color: "#94a3b8" }}>
          Track. Focus. Improve 🚀
        </p>
      </div>

      {/* 👋 User */}
      <h3>👋 Welcome {user}</h3>

      {/* 🔴 Logout */}
      <button
        onClick={() => {
          localStorage.removeItem("user");
          setUser("");
        }}
      >
        Logout
      </button>

      {/* ⏱️ Timer */}
      <div className="card">
        <Timer />
      </div>

      {/* 📋 Tasks */}
      <div className="card">
        <TaskManager />
      </div>

      {/* 📊 Stats */}
      <div className="card">
        <Stats />
      </div>

      {/* 📅 History */}
      <div className="card">
        <History />
      </div>
    </div>
  );
}