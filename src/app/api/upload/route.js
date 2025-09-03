import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "schoolimages" }, // folder in Cloudinary
        (error, result) => {
          if (error) {
            reject(new Response(JSON.stringify({ error: error.message }), { status: 500 }));
          } else {
            resolve(new Response(JSON.stringify({ url: result.secure_url }), { status: 200 }));
          }
        }
      );
      uploadStream.end(buffer);
    });
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
