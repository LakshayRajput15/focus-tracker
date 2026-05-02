import { useState, useEffect } from "react";

export default function TaskManager() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [input, setInput] = useState("");

  // 💾 Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // 🔔 Ask permission
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  // 🔊 Beep sound function
  function playBeep() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
    }, 300);
  }

  const addTask = () => {
    if (!input) return;
    setTasks([
      ...tasks,
      { text: input, done: false, priority: false },
    ]);
    setInput("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;

    if (updated[index].done) {
      // 🔔 Notification
      if (Notification.permission === "granted") {
        new Notification("Task Completed ✅");
      } else {
        alert("Task Completed ✅");
      }

      // 🔊 Sound
      playBeep();
    }

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

  const completedCount = tasks.filter((t) => t.done).length;

  return (
    <div>
      <h2>📋 Tasks</h2>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task"
      />

      <button onClick={addTask}>Add</button>

      <p>Completed: {completedCount}</p>

      {tasks.map((task, i) => (
        <div key={i}>
          <span
            onClick={() => toggleTask(i)}
            style={{
              textDecoration: task.done ? "line-through" : "none",
              color: task.priority ? "yellow" : "white",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            {task.text}
          </span>

          <button onClick={() => togglePriority(i)}>⭐</button>
          <button onClick={() => deleteTask(i)}>❌</button>
        </div>
      ))}
    </div>
  );
}