import { connectToDatabase } from "@/lib/db";

// Handle POST request
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, address, city, state, contact, email_id, image } = body;

    // Basic validation
    if (!name || !email_id) {
      return new Response(JSON.stringify({ success: false, message: "Name and Email are required" }), { status: 400 });
    }
console.log(name, address, city, state, contact, email_id, image);
    const db = await connectToDatabase();
    await db.execute(
      "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, email_id, image]
    );

    return new Response(JSON.stringify({ success: true, message: "School added successfully" }), { status: 200 });
  } catch (err) {
    console.error("AddSchool API Error:", err); // Add this line
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
