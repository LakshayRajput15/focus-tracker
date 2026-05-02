import { useState, useEffect } from "react";

export default function TaskManager() {
  const user = localStorage.getItem("user");

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem(`${user}_tasks`)) || []
  );

  const [input, setInput] = useState("");

  // 💾 save tasks
  useEffect(() => {
    localStorage.setItem(`${user}_tasks`, JSON.stringify(tasks));
  }, [tasks]);

  // 🔔 permission
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  // 🔊 beep
  function playBeep() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    setTimeout(() => oscillator.stop(), 300);
  }

  // 🟢 ADD TASK
  const addTask = () => {
    if (!input) return;

    const newTask = {
      text: input,
      done: false,
      priority: false,
      date: new Date().toLocaleString(),
    };

    const updated = [...tasks, newTask];
    setTasks(updated);

    // history
    const history =
      JSON.parse(localStorage.getItem(`${user}_history`)) || [];

    history.push({
      type: "ADD",
      message: `Added task: ${input}`,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem(`${user}_history`, JSON.stringify(history));

    setInput("");
  };

  // 🟢 COMPLETE TASK
  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;

    setTasks(updated);

    // notification + sound
    if (updated[index].done) {
      if (Notification.permission === "granted") {
        new Notification("Task Completed ✅");
      } else {
        alert("Task Completed ✅");
      }
      playBeep();
    }

    // history
    const history =
      JSON.parse(localStorage.getItem(`${user}_history`)) || [];

    history.push({
      type: "COMPLETE",
      message: `Completed task: ${updated[index].text}`,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem(`${user}_history`, JSON.stringify(history));
  };

  // 🟢 DELETE TASK
  const deleteTask = (index) => {
    const deleted = tasks[index];

    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);

    const history =
      JSON.parse(localStorage.getItem(`${user}_history`)) || [];

    history.push({
      type: "DELETE",
      message: `Deleted task: ${deleted.text}`,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem(`${user}_history`, JSON.stringify(history));
  };

  // 🟢 PRIORITY
  const togglePriority = (index) => {
    const updated = [...tasks];
    updated[index].priority = !updated[index].priority;

    setTasks(updated);

    const history =
      JSON.parse(localStorage.getItem(`${user}_history`)) || [];

    history.push({
      type: "PRIORITY",
      message: `Marked important: ${updated[index].text}`,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem(`${user}_history`, JSON.stringify(history));
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