import { LineChart, Line, XAxis, YAxis } from "recharts";

export default function Stats() {
  const data = [
    { day: "Mon", time: 20 },
    { day: "Tue", time: 40 },
    { day: "Wed", time: 30 },
  ];

  return (
    <div>
      <h2>📊 Weekly Stats</h2>
      <LineChart width={300} height={200} data={data}>
        <XAxis dataKey="day" />
        <YAxis />
        <Line dataKey="time" />
      </LineChart>
    </div>
  );
}