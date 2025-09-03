"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-between items-center min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 font-sans">
      {/* Header */}
      <header className="w-full p-4 bg-teal-700 text-white text-2xl font-semibold text-center shadow-md">
        🎓 School Management Portal
      </header>

      {/* Main Content */}
      <main className="flex flex-col flex-1 items-center justify-center gap-8 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 drop-shadow-sm">
          Welcome to School Management
        </h1>

        <div className="flex flex-wrap justify-center gap-4 w-full max-w-md">
          <Link href="/addSchools">
            <button className="flex-1 min-w-[140px] px-6 py-3 rounded-xl font-semibold text-white bg-sky-600 hover:bg-sky-700 shadow-md transition">
              ➕ Add School
            </button>
          </Link>

          <Link href="/showschools">
            <button className="flex-1 min-w-[140px] px-6 py-3 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 shadow-md transition">
              🏫 Show Schools
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-3 bg-slate-900 text-slate-200 text-sm text-center">
        © {new Date().getFullYear()} School Management | All Rights Reserved
      </footer>
    </div>
  );
}
