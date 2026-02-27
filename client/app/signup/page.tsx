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
    <div className="min-h-screen flex items-center justify-center bg-amber-200 p-6">
      <div
        className="w-full max-w-md bg-white border-4 border-black rounded-2xl 
    shadow-[12px_12px_0px_#000] p-8 flex flex-col gap-6"
      >
        <h1 className="text-4xl font-extrabold text-black tracking-tight">
          Create Account
        </h1>

        {error && (
          <p className="bg-red-400 border-4 border-black text-black font-bold p-3 rounded-lg shadow-[6px_6px_0px_#000]">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="text-gray-700 border-4 border-black rounded-lg py-4 pl-4 pr-36 text-lg font-semibold
        placeholder-black bg-white outline-none
        focus:translate-x-1 focus:translate-y-1
        focus:shadow-[4px_4px_0px_#000]
        shadow-[6px_6px_0px_#000]
        transition-all duration-150"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="text-gray-700 border-4 border-black rounded-lg py-4 pl-4 pr-36 text-lg font-semibold
        placeholder-black bg-white outline-none
        focus:translate-x-1 focus:translate-y-1
        focus:shadow-[4px_4px_0px_#000]
        shadow-[6px_6px_0px_#000]
        transition-all duration-150"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="text-gray-700 border-4 border-black rounded-lg py-4 pl-4 pr-36 text-lg font-semibold
        placeholder-black bg-white outline-none
        focus:translate-x-1 focus:translate-y-1
        focus:shadow-[4px_4px_0px_#000]
        shadow-[6px_6px_0px_#000]
        transition-all duration-150"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <p className="font-bold text-black">
          Already have an account?{" "}
          <Link
            href="/login"
            className="underline decoration-4 hover:text-green-600"
          >
            Login
          </Link>
        </p>

        <button
          onClick={handleSignup}
          className="cursor-pointer bg-green-500 text-white text-2xl font-extrabold py-4 px-36
        border-4 border-black rounded-xl shadow-[10px_10px_0px_#000]
        hover:translate-x-1 hover:translate-y-1 
        hover:shadow-[6px_6px_0px_#000]
        active:translate-x-2 active:translate-y-2
        active:shadow-[2px_2px_0px_#000]
        transition-all duration-150"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
