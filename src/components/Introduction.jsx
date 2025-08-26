import React from "react";

export default function Introduction({ onEnter }) {
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      backgroundImage: "url('https://www.shutterstock.com/image-photo/night-planet-earth-space-light-600nw-2495143773.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      textShadow: "0 2px 8px rgba(0,0,0,0.5)"
    }}>
      <h1 style={{ fontSize: "3rem", fontWeight: 700, marginBottom: 24 }}>Global Disaster Tracker</h1>
      <p style={{ fontSize: "1.3rem", maxWidth: 600, textAlign: "center", marginBottom: 32 }}>
        Welcome to the Global Disaster Tracker! Stay informed about natural disasters and weather conditions worldwide. Search any location, view real-time events on interactive maps and a 3D globe, and report new disasters to help keep communities safe.
      </p>
      <button
        onClick={onEnter}
        style={{
          padding: "16px 40px",
          fontSize: "1.2rem",
          fontWeight: 600,
          borderRadius: 12,
          background: "linear-gradient(90deg,#007bff 60%,#00c6ff 100%)",
          color: "#fff",
          border: "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          cursor: "pointer"
        }}
      >
        Enter Dashboard
      </button>
    </div>
  );
}
