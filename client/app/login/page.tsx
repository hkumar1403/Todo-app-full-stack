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

      router.push("/");
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
          Welcome Back
        </h1>

        {error && (
          <p className="bg-red-400 border-4 border-black text-black font-bold p-3 rounded-lg shadow-[6px_6px_0px_#000]">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="border-4 border-black rounded-lg py-4 pl-4 pr-36 text-lg font-semibold
        placeholder-black bg-white outline-none
        shadow-[6px_6px_0px_#000]
        focus:translate-x-1 focus:translate-y-1
        focus:shadow-[4px_4px_0px_#000]
        transition-all duration-150 text-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleLogin();
          }}
        />

        <input
          type="password"
          placeholder="Password"
          className="border-4 border-black rounded-lg py-4 pl-4 pr-36 text-lg font-semibold
        placeholder-black bg-white outline-none
        shadow-[6px_6px_0px_#000]
        focus:translate-x-1 focus:translate-y-1
        focus:shadow-[4px_4px_0px_#000]
        transition-all duration-150 text-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleLogin();
          }}
        />

        <p className="font-bold text-black">
          New here?{" "}
          <Link
            href="/signup"
            className="underline decoration-4 hover:text-green-600"
          >
            Create an account
          </Link>
        </p>

        <button
          onClick={handleLogin}
          className="cursor-pointer bg-green-500 text-white text-2xl font-extrabold py-4 px-38
        border-4 border-black rounded-xl shadow-[10px_10px_0px_#000]
        hover:translate-x-1 hover:translate-y-1
        hover:shadow-[6px_6px_0px_#000]
        active:translate-x-2 active:translate-y-2
        active:shadow-[2px_2px_0px_#000]
        transition-all duration-150"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
