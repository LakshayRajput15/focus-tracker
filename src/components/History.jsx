import { useState, useEffect } from "react";

export default function History() {
  const [data, setData] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const user = localStorage.getItem("user");

      const historyData =
        JSON.parse(localStorage.getItem(`${user}_history`)) || [];

      setData([...historyData].reverse());
    }, 1000); // 🔥 हर 1 sec update

    return () => clearInterval(interval);
  }, []);

  // 📅 filter
  const filteredData = data.filter((item) => {
    if (!filterDate) return true;

    const itemDate = new Date(item.date).toISOString().split("T")[0];
    return itemDate === filterDate;
  });

  return (
    <div>
      <h2>📅 History (Live)</h2>

      {/* 📅 Date filter */}
      <input
        type="date"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
      />

      {filteredData.length === 0 && (
        <p style={{ color: "red" }}>No data</p>
      )}

      {filteredData.map((item, i) => (
        <div
          key={i}
          style={{
            marginBottom: "10px",
            padding: "10px",
            background: "#334155",
            borderRadius: "8px",
          }}
        >
          <b>{item.type}</b> - {item.message}
          <br />
          <small>{item.date}</small>
        </div>
      ))}
    </div>
  );
}