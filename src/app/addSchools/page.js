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

      // Hide message after 5 seconds
      setTimeout(() => setMessage(""), 5000);

    } catch (err) {
      setMessage("Error adding school: " + err.message);
      setUploading(false);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 font-sans">
      {/* Header */}
      <header className="w-full p-4 bg-teal-700 text-white text-2xl font-semibold text-center shadow-md">
        🎓 School Management Portal
      </header>

      {/* Main Form Section */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg p-8 bg-white shadow-2xl rounded-2xl border border-gray-200">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
            🏫 Add School
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <input
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[A-Za-z\s.,'\u2019-]+$/,
                  message: "Only letters, spaces, dot (.), comma (,), hyphen (-), and apostrophe (') are allowed"
                },
              })}
              placeholder="School Name"
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            {/* Address */}
            <input
              {...register("address", { required: true })}
              placeholder="Address"
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
            />

            {/* City & State */}
            <div className="flex gap-4">
              <input
                {...register("city", {
                  required: "City is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Only letters allowed",
                  },
                })}
                placeholder="City"
                className="border p-3 w-1/2 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              <input
                {...register("state", {
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Only letters allowed",
                  },
                })}
                placeholder="State"
                className="border p-3 w-1/2 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {(errors.city || errors.state) && (
              <p className="text-red-500 text-sm">
                {errors.city?.message || errors.state?.message}
              </p>
            )}

            {/* Contact */}
            <input
              {...register("contact", {
                required: "Contact number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit number",
                },
              })}
              placeholder="Contact Number"
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
              inputMode="numeric"
            />
            {errors.contact && (
              <p className="text-red-500 text-sm">{errors.contact.message}</p>
            )}

            {/* Email */}
            <input
              {...register("email_id", {
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
              placeholder="Email"
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            {errors.email_id && (
              <p className="text-red-500 text-sm">{errors.email_id.message}</p>
            )}

            {/* File Upload */}
            <label className="block">
              <span className="text-gray-700">Upload School Image</span>
              <input
                type="file"
                accept="image/*"
                {...register("imageFile")}
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setPreview(URL.createObjectURL(e.target.files[0]));
                  }
                }}
                className="block w-full text-sm text-gray-900 mt-2
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-600 file:text-white
                  hover:file:bg-blue-700 cursor-pointer"
              />
            </label>

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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 transition-all"
            >
              {uploading ? "Uploading..." : "✅ Submit"}
            </button>
          </form>

          {message && (
            <p className="mt-5 text-center text-green-600 font-medium">
              {message}
            </p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-4 bg-slate-900 text-gray-200 text-center text-sm shadow-md">
        © {new Date().getFullYear()} School Management | All Rights Reserved
      </footer>
    </div>
  );
}
