"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f9fafb, #eef2ff)",
        fontFamily: "Segoe UI, Arial, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          width: "100%",
          padding: "1rem 2rem",
          background: "#0f766e", // teal green
          color: "#ffffff",
          fontSize: "1.8rem",
          fontWeight: "600",
          textAlign: "center",
          letterSpacing: "0.5px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        🎓 School Management Portal
      </header>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2.8rem",
            fontWeight: "700",
            color: "#0f172a", // dark gray-blue
            textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          Welcome to School Management
        </h1>

        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <Link href="/addSchools">
            <button
              style={{
                padding: "1rem 2.5rem",
                borderRadius: "10px",
                background: "#0284c7", // sky blue
                color: "#fff",
                border: "none",
                fontWeight: "600",
                fontSize: "1rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
              }}
              onMouseOver={(e) => (e.target.style.background = "#0369a1")}
              onMouseOut={(e) => (e.target.style.background = "#0284c7")}
            >
              ➕ Add School
            </button>
          </Link>

          <Link href="/showschools">
            <button
              style={{
                padding: "1rem 2.5rem",
                borderRadius: "10px",
                background: "#16a34a", // green
                color: "#fff",
                border: "none",
                fontWeight: "600",
                fontSize: "1rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
              }}
              onMouseOver={(e) => (e.target.style.background = "#15803d")}
              onMouseOut={(e) => (e.target.style.background = "#16a34a")}
            >
              🏫  Show Schools
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          width: "100%",
          padding: "1rem 2rem",
          background: "#0f172a", // dark gray-blue
          color: "#e2e8f0", // light gray text
          textAlign: "center",
          fontSize: "0.95rem",
          letterSpacing: "0.3px",
          boxShadow: "0px -2px 8px rgba(0,0,0,0.15)",
        }}
      >
        © {new Date().getFullYear()} School Management | All Rights Reserved
      </footer>
    </div>
  );
}
