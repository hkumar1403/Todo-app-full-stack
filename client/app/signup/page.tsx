"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  async function handleSignup() {
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      if (!res.ok) {
        throw new Error("Signup failed");
      }

      alert("Account created! Now login.");
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col gap-4 p-10 align-baseline text-center justify-center bg-white h-screen">
      <h1 className="text-black font-bold text-3xl">Sign Up</h1>
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
            handleSignup();
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
            handleSignup();
          }
        }}
      />
      <input
        type="password"
        placeholder=" Confirm Password"
        className="border-b-2 p-4 border-b-purple-300 placeholder-gray-400 outline-none focus:ring-0 focus:border-b-purple-500 text-gray-800"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSignup();
          }
        }}
      />
      <p className="text-gray-600 font-semibold">
        Already have an account?{" "}
        <Link href="/login" className="text-purple-400 hover:underline">
          Login
        </Link>
      </p>
      <button
        onClick={handleSignup}
        className={`bg-purple-500 text-white p-4 rounded-4xl cursor-pointer font-bold border-b-blue-300 ${error ? "border-b-red-500" : "border-b-purple-300 focus:border-b-purple-500"}`}
      >
        Sign Up
      </button>
    </div>
  );
}
