import React from "react";

export default function Header({ activeView, setActiveView }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 24 }}>
      {["Map", "Globe", "Location Statistics"].map((view) => (
        <button
          key={view}
          onClick={() => setActiveView(view)}
          style={{
            padding: "10px 24px",
            margin: "0 8px",
            backgroundColor: activeView === view ? "#007bff" : "#eee",
            color: activeView === view ? "#fff" : "#333",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "1rem",
            boxShadow: activeView === view ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          {view}
        </button>
      ))}
    </div>
  );
}
