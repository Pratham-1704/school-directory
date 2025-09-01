"use client";

import { useEffect, useState } from "react";
import { Input, Card, Row, Col, Modal, Spin, Button } from "antd";

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
    <div style={{ padding: 16, maxWidth: 1200, margin: "0 auto" }}>
      <h2 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 24, textAlign: "center" }}>
        Schools List
      </h2>
      <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
        <Input.Search
          placeholder="Search by name or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 400, width: "100%" }}
          allowClear
        />
        <Button type="primary" onClick={handleRefresh}>
          Refresh
        </Button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Spin size="large" />
        </div>
      ) : filteredSchools.length === 0 ? (
        <p style={{ textAlign: "center" }}>No schools found.</p>
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
                      height: 160,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                }
                onClick={() => setSelectedSchool(school)}
                style={{ borderRadius: 12, minHeight: 320 }}
                //bodyStyle={{ padding: 16 }}
                styles={{ body: { padding: '16px' } }}

              >
                <Card.Meta
                  title={<span style={{ fontWeight: 600 }}>{school.name}</span>}
                  description={
                    <>
                      <div style={{ marginBottom: 4 }}>{school.address}</div>
                      <div style={{ color: "#888" }}>{school.city}</div>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal
        open={!!selectedSchool}
        title={selectedSchool?.name}
        onCancel={() => setSelectedSchool(null)}
        footer={null}
        centered
        width={350}
        //bodyStyle={{ padding: 16 }}
        styles={{ body: { padding: 20 } }}
      >
        {selectedSchool && (
          <div>
            <img
              src={selectedSchool.image || "https://via.placeholder.com/150"}
              alt={selectedSchool.name}
              style={{
                width: "100%",
                height: 160,
                objectFit: "cover",
                borderRadius: 8,
                marginBottom: 16,
              }}
            />
            <p><strong>Address:</strong> {selectedSchool.address}</p>
            <p><strong>City:</strong> {selectedSchool.city}</p>
            <p><strong>State:</strong> {selectedSchool.state}</p>
            <p><strong>Contact:</strong> {selectedSchool.contact}</p>
            <p><strong>Email:</strong> {selectedSchool.email_id}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}