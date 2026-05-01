import { useState, useEffect } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(
    JSON.parse(localStorage.getItem("time")) || 1500
  );
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState("work");

  useEffect(() => {
    let interval;

    if (running && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
    }

    if (seconds === 0) {
      if (mode === "work") {
        alert("Break Time!");
        setMode("break");
        setSeconds(300);
      } else {
        alert("Back to Work!");
        setMode("work");
        setSeconds(1500);
      }
    }

    return () => clearInterval(interval);
  }, [running, seconds]);

  useEffect(() => {
    localStorage.setItem("time", JSON.stringify(seconds));
  }, [seconds]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div>
      <h2>🍅 {mode === "work" ? "Work Time" : "Break Time"}</h2>
      <h1>
        {minutes}:{String(secs).padStart(2, "0")}
      </h1>

      <button onClick={() => setRunning(true)}>Start</button>
      <button onClick={() => setRunning(false)}>Pause</button>
      <button onClick={() => setSeconds(1500)}>Reset</button>
    </div>
  );
}