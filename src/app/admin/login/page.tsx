"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import AuthWindow from "@/components/layout/AuthWindow";
import Input from "@/components/layout/Input";
import { loginSchema } from "@/schema/loginSchema";
import { retro } from "@/lib/fonts";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validate with Zod schema
    const validation = loginSchema.safeParse({ username, password });

    if (!validation.success) {
      setError(validation.error.issues[0].message);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setIsLoading(false);
        return;
      }

      // Login success - redirect to admin dashboard
      router.push("/admin");
      router.refresh(); // Refresh to update auth state
    } catch (error) {
      setError("Something went wrong, try again");
      setIsLoading(false);
    }
  };

  return (
    <div className={retro.className}>
      <div className="min-h-screen flex items-center justify-center bg-[#C0C0C0]">
        <AuthWindow title="Login - Light">
          <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
            <Input
              value={username}
              onChange={handleUsernameChange}
              label="Username"
              placeholder="admin"
              type="text"
              disabled={isLoading}
            />

            <Input
              value={password}
              onChange={handlePasswordChange}
              label="Password"
              placeholder="password"
              type="password"
              disabled={isLoading}
            />

            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="bg-gray-300 border-2 border-black py-1 hover:bg-gray-400 active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </AuthWindow>
      </div>
    </div>
  );
}
