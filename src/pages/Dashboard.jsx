import { useState, useEffect } from "react";
import Timer from "../components/Timer";
import TaskManager from "../components/TaskManager";
import Stats from "../components/Stats";
import Login from "../components/Login";

export default function Dashboard() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(savedUser);
  }, []);

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <div className="container">
      <h1>🚀 Focus Tracker</h1>
      <h3>Welcome {user}</h3>

      <div className="card">
        <Timer />
      </div>

      <div className="card">
        <TaskManager />
      </div>

      <div className="card">
        <Stats />
      </div>
    </div>
  );
}