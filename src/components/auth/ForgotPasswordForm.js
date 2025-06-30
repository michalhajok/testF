"use client";
import { useState } from "react";

export default function ForgotPasswordForm({ onSubmit, loading }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!email) {
      setError("Email jest wymagany");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Niepoprawny format adresu email");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(email);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      aria-label="Formularz resetowania hasła"
    >
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          disabled={loading}
          className={`w-full px-3 py-2 border rounded ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          aria-invalid={!!error}
          aria-describedby="forgot-email-error"
        />
        {error && (
          <span id="forgot-email-error" className="text-xs text-red-600">
            {error}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? "Wysyłanie..." : "Wyślij link resetujący"}
      </button>
    </form>
  );
}
