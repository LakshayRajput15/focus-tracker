import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function Stats() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const user = localStorage.getItem("user");

      const sessions =
        JSON.parse(localStorage.getItem(`${user}_sessions`)) || [];

      setData(sessions);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const totalTime = data.reduce(
    (sum, item) => sum + Number(item.time),
    0
  );

  return (
    <div>
      <h2>📊 Live Stats</h2>

      <h3>Total Focus Time: {totalTime} mins</h3>

      <LineChart width={400} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="date" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip />

        <Line
          type="monotone"
          dataKey="time"
          stroke="#3b82f6"
          strokeWidth={3}
          dot={{ r: 4 }}
          isAnimationActive={true}
        />
      </LineChart>
    </div>
  );
}