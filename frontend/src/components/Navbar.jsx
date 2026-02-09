import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div
      style={{
        padding: "15px 20px",
        background: "#111827",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h2 style={{ margin: 0 }}>HRMS Lite</h2>

      <div style={{ display: "flex", gap: "15px" }}>
        <Link style={{ color: "white", textDecoration: "none" }} to="/">
          Employees
        </Link>
      </div>
    </div>
  );
}