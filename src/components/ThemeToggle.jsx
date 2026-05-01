import { useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  return (
    <button onClick={() => setDark(!dark)}>
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}