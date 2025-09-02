"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onSubmit = async (data) => {
    try {
      let imageUrl = "";

      // 1. Upload image if selected
      if (data.imageFile?.[0]) {
        setUploading(true);
        const formData = new FormData();
        formData.append("file", data.imageFile[0]);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadResult = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadResult.error || "Image upload failed");

        imageUrl = uploadResult.url;
        setUploading(false);
      }

      // 2. Save school data with image URL to DB
      const res = await fetch("/api/addschool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, image: imageUrl }),
      });

      const result = await res.json();
      setMessage(result.message || result.error);

      if (res.ok) reset();
      setPreview(null);

      // Hide message after 3 seconds
      setTimeout(() => setMessage(""), 5000);

    } catch (err) {
      setMessage("Error adding school: " + err.message);
      setUploading(false);

      // Hide error message after 5 seconds
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="w-full max-w-lg p-8 bg-white shadow-2xl rounded-2xl border border-gray-200">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
          🏫 Add School
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <input
            {...register("name", { required: true })}
            placeholder="School Name"
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}

          <input
            {...register("address", { required: true })}
            placeholder="Address"
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex gap-4">
            <input
              {...register("city", { required: true })}
              placeholder="City"
              className="border p-3 w-1/2 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <input
              {...register("state")}
              placeholder="State"
              className="border p-3 w-1/2 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <input
            {...register("contact", {
              required: true,
              pattern: /^[0-9]{10}$/, // Only 11 digits
            })}
            placeholder="Contact Number"
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          {errors.contact && (
            <p className="text-red-500 text-sm">Enter a valid 10-digit contact number</p>
          )}

          <input
            {...register("email_id", { pattern: /^\S+@\S+$/i })}
            placeholder="Email"
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          {errors.email_id && (
            <p className="text-red-500 text-sm">Enter a valid email</p>
          )}

          {/* File upload input */}
          <input
            type="file"
            accept="image/*"
            {...register("imageFile")}
            onChange={(e) => {
              if (e.target.files[0]) {
                setPreview(URL.createObjectURL(e.target.files[0]));
              }
            }}
            className="w-full text-gray-700"
          />

          {/* Preview */}
          {preview && (
            <div className="w-full h-40 rounded-lg overflow-hidden shadow-inner mt-2 flex justify-center items-center border border-gray-200">
              <img
                src={preview}
                alt="Preview"
                className="object-contain h-full"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 transition-all"
          >
            {uploading ? "Uploading..." : "✅ Submit"}
          </button>
        </form>

        {message && (
          <p className="mt-5 text-center text-green-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}
