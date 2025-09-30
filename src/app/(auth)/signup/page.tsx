"use client";

import AuthForm from "@/components/AuthForm";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Something went wrong");

      console.log("Signup successful:", result);

      // ✅ Store token in localStorage
      if (result.token) {
        localStorage.setItem("token", result.token);
      }

      // ✅ Store user info
      localStorage.setItem("user", JSON.stringify(result.user));

      // ✅ Redirect to dashboard (or another page)
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
        type="signup"
        onSubmit={handleSignup}
        loading={loading}
        error={error || undefined}
      />
    </div>
  );
};

export default SignupPage;
