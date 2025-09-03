"use client";

import { useEffect, useState } from "react";
import { Input, Card, Row, Col, Modal, Spin, Button } from "antd";
import Link from "next/link";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSchools() {
      try {
        const res = await fetch("/api/getschools");
        const data = await res.json();
        setSchools(data);
      } catch (err) {
        console.error("Error fetching schools:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSchools();
  }, []);

  const filteredSchools = schools.filter(
    (school) =>
      school.name.toLowerCase().includes(search.toLowerCase()) ||
      school.city.toLowerCase().includes(search.toLowerCase())
  );

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/getschools");
      const data = await res.json();
      setSchools(data);
    } catch (err) {
      console.error("Error refreshing schools:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f9ff, #ecfdf5)",
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
        {/* 🎓
         School Management Portal */}
          <Link href="/" className="hover:text-yellow-300 transition">
          🎓 School Management Portal
        </Link>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: 24 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: 32,
              fontWeight: "bold",
              marginBottom: 24,
              textAlign: "center",
              color: "#1e3a8a",
              textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            🏫 Schools List
          </h2>

          <div
            style={{
              display: "flex",
              gap: 16,
              marginBottom: 24,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Input.Search
              placeholder="Search by name or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: 400, width: "100%", borderRadius: 8 }}
              allowClear
            />
            <Button
              type="primary"
              onClick={handleRefresh}
              style={{
                background: "#2563eb",
                borderRadius: 8,
                fontWeight: "600",
              }}
            >
              🔄 Refresh
            </Button>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <Spin size="large" />
            </div>
          ) : filteredSchools.length === 0 ? (
            <p
              style={{ textAlign: "center", fontSize: 16, color: "#6b7280" }}
            >
              No schools found.
            </p>
          ) : (
            <Row gutter={[16, 16]}>
              {filteredSchools.map((school) => (
                <Col key={school.id} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={school.name}
                        src={school.image || "https://via.placeholder.com/150"}
                        style={{
                          width: "100%",
                          height: "160px",
                          objectFit: "contain",
                          borderRadius: 8,
                          background: "#f9fafb",
                        }}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150";
                        }}
                      />
                    }
                    onClick={() => setSelectedSchool(school)}
                    style={{
                      borderRadius: 16,
                      minHeight: 320,
                      boxShadow: "0px 4px 8px rgba(0,0,0,0.08)",
                      transition: "transform 0.2s ease",
                    }}
                    styles={{ body: { padding: 16 } }}
                  >
                    <Card.Meta
                      title={
                        <span style={{ fontWeight: 600, fontSize: "1.1rem" }}>
                          {school.name}
                        </span>
                      }
                      description={
                        <>
                          <div style={{ marginBottom: 4 }}>
                            {school.address}
                          </div>
                          <div style={{ color: "#6b7280" }}>{school.city}</div>
                        </>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          )}

          {/* Modal */}
          <Modal
            open={!!selectedSchool}
            title={
              <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                {selectedSchool?.name}
              </span>
            }
            onCancel={() => setSelectedSchool(null)}
            footer={null}
            centered
            width={380}
            styles={{ body: { padding: 20 } }}
          >
            {selectedSchool && (
              <div>
                <img
                  src={
                    selectedSchool.image || "https://via.placeholder.com/150"
                  }
                  alt={selectedSchool.name}
                  style={{
                    width: "100%",
                    height: 180,
                    objectFit: "contain",
                    borderRadius: 8,
                    marginBottom: 16,
                    background: "#f9fafb",
                  }}
                />
                <p>
                  <strong>📍 Address:</strong> {selectedSchool.address}
                </p>
                <p>
                  <strong>🏙 City:</strong> {selectedSchool.city}
                </p>
                {/* Uncomment if you want more fields */}
                {/* <p><strong>State:</strong> {selectedSchool.state}</p> */}
                {/* <p><strong>Contact:</strong> {selectedSchool.contact}</p> */}
                {/* <p><strong>Email:</strong> {selectedSchool.email_id}</p> */}
              </div>
            )}
          </Modal>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          width: "100%",
          padding: "1rem 2rem",
          background: "#0f172a", // dark gray-blue
          color: "#e2e8f0",
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
