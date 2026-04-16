#! app/register/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "BUYER" as "BUYER" | "SELLER",
    storeName: "",
    bio: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("✅ Account created successfully! You can now log in.");
      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "BUYER",
        storeName: "",
        bio: "",
      });
      // Redirect to login after 1.5 seconds
      setTimeout(() => router.push("/login"), 1500);
    } else {
      setMessage("❌ " + (data.error || "Something went wrong"));
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-12 px-4">
      <div className="bg-white border border-haven-primary/20 rounded-3xl shadow-xl p-8">
        <h1 className="text-4xl font-heading font-bold text-center mb-8 text-haven-dark">
          Join Handcrafted Haven
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-4 border border-haven-dark/30 rounded-2xl focus:outline-none focus:border-haven-primary"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-4 border border-haven-dark/30 rounded-2xl focus:outline-none focus:border-haven-primary"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-4 border border-haven-dark/30 rounded-2xl focus:outline-none focus:border-haven-primary"
          />

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium mb-2 text-haven-dark/70">I want to join as:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-4 border border-haven-dark/30 rounded-2xl focus:outline-none focus:border-haven-primary"
            >
              <option value="BUYER">Buyer (shop only)</option>
              <option value="SELLER">Seller (upload products)</option>
            </select>
          </div>

          {/* Seller fields - only show if SELLER is selected */}
          {formData.role === "SELLER" && (
            <>
              <input
                type="text"
                name="storeName"
                placeholder="Store / Studio Name"
                value={formData.storeName}
                onChange={handleChange}
                required
                className="w-full p-4 border border-haven-dark/30 rounded-2xl focus:outline-none focus:border-haven-primary"
              />
              <textarea
                name="bio"
                placeholder="Short bio (optional)"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className="w-full p-4 border border-haven-dark/30 rounded-2xl focus:outline-none focus:border-haven-primary"
              />
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-haven-primary hover:bg-haven-primary/90 text-white py-4 rounded-2xl text-xl font-semibold transition disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* Status Message */}
        {message && (
          <p className="mt-6 text-center font-medium text-lg">{message}</p>
        )}

        {/* Link to Login */}
        <p className="text-center mt-8 text-haven-dark/70">
          Already have an account?{" "}
          <Link href="/login" className="text-haven-primary hover:underline font-semibold">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}