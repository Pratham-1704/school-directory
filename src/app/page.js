"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #f0f4ff, #e6fffa)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "#1e3a8a",
          textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        🎓 School Management
      </h1>

      <div style={{ display: "flex", gap: "1.5rem" }}>
        <Link href="/addSchools">
          <button
            style={{
              padding: "1rem 2.5rem",
              borderRadius: "8px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            }}
            onMouseOver={(e) => (e.target.style.background = "#1d4ed8")}
            onMouseOut={(e) => (e.target.style.background = "#2563eb")}
          >
            ➕ Add School
          </button>
        </Link>

        <Link href="/showschools">
          <button
            style={{
              padding: "1rem 2.5rem",
              borderRadius: "8px",
              background: "#10b981",
              color: "#fff",
              border: "none",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            }}
            onMouseOver={(e) => (e.target.style.background = "#059669")}
            onMouseOut={(e) => (e.target.style.background = "#10b981")}
          >
            📚 Show Schools
          </button>
        </Link>
      </div>
    </div>
  );
}
