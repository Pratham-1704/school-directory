"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Link href="/addSchools">
        <button style={{ padding: "1rem 2rem", borderRadius: "6px", background: "#2563eb", color: "#fff", border: "none", fontWeight: "bold" }}>
          Add School
        </button>
      </Link>
      <Link href="/showschools">
        <button style={{ padding: "1rem 2rem", borderRadius: "6px", background: "#10b981", color: "#fff", border: "none", fontWeight: "bold" }}>
          Show Schools
        </button>
      </Link>
    </div>
  );
}