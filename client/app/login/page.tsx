"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  async function handleLogin() {
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        },
      );

      if (!res.ok) {
        return setError("Invalid credentials");
      }

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col align-baseline text-center justify-center gap-4 p-10 h-screen bg-white">
      <h1 className="text-black font-bold text-3xl">Login</h1>
      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        className={`border-b-2 p-4  placeholder-gray-400 outline-none focus:ring-0  text-gray-800 ${
          error
            ? "border-b-red-500"
            : "border-b-purple-300 focus:border-b-purple-500"
        }`}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleLogin();
          }
        }}
      />
      <input
        type="password"
        placeholder="Password"
        className="border-b-2 p-4 border-b-purple-300 placeholder-gray-400 outline-none focus:ring-0 focus:border-b-purple-500 text-gray-800"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleLogin();
          }
        }}
      />
      <p className="text-gray-600 font-semibold">
        New here?{" "}
        <Link href="/signup" className="text-purple-400 hover:underline">
          Create an account
        </Link>
      </p>
      <button
        onClick={handleLogin}
        className={`bg-purple-500 text-white p-4 rounded-4xl cursor-pointer font-bold border-b-blue-300 ${error ? "border-b-red-500" : "border-b-purple-300 focus:border-b-purple-500"}`}
      >
        Login
      </button>
    </div>
  );
}
