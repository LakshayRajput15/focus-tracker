import { useState, useEffect } from "react";

export default function TaskManager() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input) return;
    setTasks([...tasks, { text: input, done: false, priority: false }]);
    setInput("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const togglePriority = (index) => {
    const updated = [...tasks];
    updated[index].priority = !updated[index].priority;
    setTasks(updated);
  };

  const clearAll = () => {
    setTasks([]);
  };

  const completedCount = tasks.filter(task => task.done).length;

  return (
    <div>
      <h2>📋 Tasks</h2>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task..."
      />

      <button onClick={addTask}>Add</button>
      <button onClick={clearAll}>🧹 Clear All</button>

      <p>✅ Completed: {completedCount}</p>

      {tasks.map((task, i) => (
        <div key={i}>
          <span
            onClick={() => toggleTask(i)}
            style={{
              textDecoration: task.done ? "line-through" : "none",
              cursor: "pointer",
              marginRight: "10px",
              color: task.priority ? "yellow" : "white"
            }}
          >
            • {task.text}
          </span>

          <button onClick={() => togglePriority(i)}>⭐</button>
          <button onClick={() => deleteTask(i)}>❌</button>
        </div>
      ))}
    </div>
  );
}