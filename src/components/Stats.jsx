import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis } from "recharts";

export default function Stats() {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("sessions")) || []
  );

  // 🔄 Auto update every second
  useEffect(() => {
    const interval = setInterval(() => {
      const updated =
        JSON.parse(localStorage.getItem("sessions")) || [];
      setData(updated);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const totalTime = data.reduce(
    (sum, item) => sum + item.time,
    0
  );

  return (
    <div>
      <h2>📊 Stats</h2>

      <h3>Total Focus Time: {totalTime} mins</h3>

      <LineChart width={300} height={200} data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Line dataKey="time" />
      </LineChart>
    </div>
  );
}