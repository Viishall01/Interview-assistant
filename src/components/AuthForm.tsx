"use client";

import { useState, FormEvent } from "react";

type AuthFormProps = {
  type: "login" | "signup";
  onSubmit: (data: any) => void | Promise<void>;
  loading?: boolean;
  error?: string;
};

const AuthForm: React.FC<AuthFormProps> = ({
  type,
  onSubmit,
  loading = false,
  error,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Only used for signup

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData: Record<string, string> = { email, password };
    if (type === "signup") formData.name = name;

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center">
        {type === "login" ? "Login" : "Sign Up"}
      </h2>

      {type === "signup" && (
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
      >
        {loading ? "Please wait..." : type === "login" ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default AuthForm;
