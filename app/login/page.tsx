// app/login/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      window.location.href = "/"; // redirect to homepage
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-haven-cream px-4">
      <div className="max-w-md w-full bg-white border border-haven-dark/10 rounded-3xl shadow-xl p-8">
        <h1 className="text-4xl font-heading font-bold text-center mb-8 text-haven-dark">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="w-full p-4 border border-haven-dark/30 rounded-3xl focus:outline-none focus:border-haven-primary"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-4 border border-haven-dark/30 rounded-3xl focus:outline-none focus:border-haven-primary"
          />

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-haven-primary text-white py-4 rounded-3xl text-xl font-semibold hover:bg-haven-primary/90 transition disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-8 text-haven-dark/70">
          Don’t have an account?{" "}
          <Link href="/register" className="text-haven-primary font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}