"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container">
      {/* Header */}
      <header className="header">🎓 School Management Portal</header>

      {/* Main Content */}
      <main className="main">
        <h1 className="title">Welcome to School Management</h1>

        <div className="button-group">
          <Link href="/addSchools">
            <button className="btn btn-blue">➕ Add School</button>
          </Link>

          <Link href="/showschools">
            <button className="btn btn-green">🏫 Show Schools</button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} School Management | All Rights Reserved
      </footer>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #f9fafb, #eef2ff);
          font-family: Segoe UI, Arial, sans-serif;
        }

        .header {
          width: 100%;
          padding: 1rem;
          background: #0f766e;
          color: #ffffff;
          font-size: 1.5rem;
          font-weight: 600;
          text-align: center;
          box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
        }

        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          justify-content: center;
          align-items: center;
          padding: 1.5rem;
          text-align: center;
        }

        .title {
          font-size: 2rem;
          font-weight: 700;
          color: #0f172a;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
        }

        .button-group {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
          width: 100%;
        }

        .btn {
          flex: 1 1 auto;
          min-width: 140px;
          padding: 0.9rem 1.5rem;
          border-radius: 10px;
          border: none;
          font-weight: 600;
          font-size: 1rem;
          color: #fff;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }

        .btn-blue {
          background: #0284c7;
        }
        .btn-blue:hover {
          background: #0369a1;
        }

        .btn-green {
          background: #16a34a;
        }
        .btn-green:hover {
          background: #15803d;
        }

        .footer {
          width: 100%;
          padding: 1rem;
          background: #0f172a;
          color: #e2e8f0;
          text-align: center;
          font-size: 0.9rem;
        }

        /* Mobile Styles */
        @media (max-width: 600px) {
          .header {
            font-size: 1.2rem;
            padding: 0.8rem;
          }
          .title {
            font-size: 1.6rem;
          }
          .btn {
            font-size: 0.9rem;
            padding: 0.8rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}
