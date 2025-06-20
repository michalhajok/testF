"use client";

import { useState } from "react";

export default function ForgotPasswordForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!email) {
      setError("Email jest wymagany");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Niepoprawny format adresu email");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      await onSubmit(email);
    } catch (error) {
      console.error("Forgot password error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Adres email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          autoComplete="email"
          required
          disabled={loading}
          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none ${
            error
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
          }`}
          placeholder="wprowadz@email.pl"
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 
                    text-white font-medium rounded-md focus:outline-none transition
                    disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Wysyłanie..." : "Wyślij link resetujący"}
        </button>
      </div>
    </form>
  );
}
