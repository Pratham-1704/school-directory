import { connectToDatabase } from "@/lib/db";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const [rows] = await db.execute("SELECT NOW() as currentTime");
    return new Response(JSON.stringify({ success: true, time: rows[0].currentTime }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
