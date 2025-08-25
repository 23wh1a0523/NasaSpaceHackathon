export default function Header({ activeView, setActiveView }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 24 }}>
      <select
        value={activeView}
        onChange={e => setActiveView(e.target.value)}
        style={{
          padding: "10px 24px",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "1.5px solid #007bff",
          fontWeight: "bold",
          background: "#fff",
          color: "#333",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          cursor: "pointer",
          outline: "none"
        }}
      >
        <option value="Map">Map</option>
        <option value="Globe">Globe</option>
        <option value="Location Statistics">Location Statistics</option>
      </select>
    </div>
  );
}