"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/addschool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setMessage(result.message || result.error);

      // Clear form after successful submission
      if (res.ok) {
        reset(); // Reset all form fields
      }
    } catch (err) {
      setMessage("Error adding school.");
    }
  };

  const imageUrl = watch("image");

  return (
    <div className="max-w-lg mx-auto p-8 bg-gradient-to-br from-gray-100 to-white shadow-xl rounded-xl mt-10 border border-gray-200">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">Add School</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <input
          {...register("name", { required: true })}
          placeholder="School Name"
          className={`border p-3 w-full rounded-lg transition duration-300 focus:ring-2 focus:ring-blue-400 ${errors.name ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

        <input
          {...register("address", { required: true })}
          placeholder="Address"
          className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-300"
        />

        <div className="flex gap-4">
          <input
            {...register("city", { required: true })}
            placeholder="City"
            className="border p-3 w-1/2 rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-300"
          />
          <input
            {...register("state")}
            placeholder="State"
            className="border p-3 w-1/2 rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-300"
          />
        </div>

        <input
          {...register("contact", { pattern: /^[0-9]+$/ })}
          placeholder="Contact Number"
          className={`border p-3 w-full rounded-lg transition duration-300 focus:ring-2 focus:ring-blue-400 ${errors.contact ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.contact && <p className="text-red-500 text-sm">Enter valid contact number</p>}

        <input
          {...register("email_id", { pattern: /^\S+@\S+$/i })}
          placeholder="Email"
          className={`border p-3 w-full rounded-lg transition duration-300 focus:ring-2 focus:ring-blue-400 ${errors.email_id ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.email_id && <p className="text-red-500 text-sm">Enter a valid email</p>}

        <input
          {...register("image")}
          placeholder="Image URL"
          className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-300"
        />

        {imageUrl && (
          <div className="w-full h-40 rounded-lg overflow-hidden shadow-inner mt-2 flex justify-center items-center border border-gray-200">
            <img src={imageUrl} alt="Preview" className="object-contain h-full" />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition transform duration-150"
        >
          Submit
        </button>
      </form>

      {message && (
        <p className="mt-5 text-center text-green-600 font-medium">{message}</p>
      )}
    </div>
  );
}
