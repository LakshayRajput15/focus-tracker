import { useState, useEffect } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [inputMin, setInputMin] = useState(25);

  // 🔊 Beep sound (no mp3 needed)
  function playBeep() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
    }, 500);
  }

  useEffect(() => {
    let interval;

    if (running && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    if (seconds === 0 && running) {
      setRunning(false);

      playBeep(); // 🔊 sound

      const sessions =
        JSON.parse(localStorage.getItem("sessions")) || [];

      sessions.push({
        date: new Date().toLocaleDateString(),
        time: inputMin,
      });

      localStorage.setItem("sessions", JSON.stringify(sessions));

      alert("Session Complete!");
    }

    return () => clearInterval(interval);
  }, [running, seconds]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div>
      <h2>⏱️ Timer</h2>

      <input
        type="number"
        value={inputMin}
        onChange={(e) => setInputMin(e.target.value)}
      />

      <button onClick={() => setSeconds(inputMin * 60)}>
        Set Timer
      </button>

      <h1>
        {minutes}:{String(secs).padStart(2, "0")}
      </h1>

      <button onClick={() => setRunning(true)}>Start</button>
      <button onClick={() => setRunning(false)}>Pause</button>
      <button onClick={() => setSeconds(0)}>Reset</button>
    </div>
  );
}