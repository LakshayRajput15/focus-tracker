import Timer from "../components/Timer";
import TaskManager from "../components/TaskManager";
import Stats from "../components/Stats";

export default function Dashboard() {
  return (
    <div className="container">
      <h1>🚀 Focus Tracker</h1>

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