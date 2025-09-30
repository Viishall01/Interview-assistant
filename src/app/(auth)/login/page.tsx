"use client";

import AuthForm from "@/components/AuthForm";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Something went wrong");

      console.log("Login successful:", result);

      // ✅ Store token in localStorage
      if (result.token) {
        localStorage.setItem("token", result.token);
      }

      // ✅ Optionally store user info
      localStorage.setItem("user", JSON.stringify(result.user));

      // ✅ Redirect after login (to dashboard for example)
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <AuthForm
        type="login"
        onSubmit={handleLogin}
        loading={loading}
        error={error || undefined}
      />
    </div>
  );
};

export default LoginPage;
