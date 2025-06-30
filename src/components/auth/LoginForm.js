"use client";
import { useState } from "react";

export default function LoginForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email jest wymagany";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Niepoprawny format adresu email";
    }
    if (!formData.password) {
      newErrors.password = "Hasło jest wymagane";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      aria-label="Formularz logowania"
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
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
          className={`w-full px-3 py-2 border rounded ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
        />
        {errors.email && (
          <span id="email-error" className="text-xs text-red-600">
            {errors.email}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Hasło
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
          className={`w-full px-3 py-2 border rounded ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          aria-invalid={!!errors.password}
          aria-describedby="password-error"
        />
        {errors.password && (
          <span id="password-error" className="text-xs text-red-600">
            {errors.password}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? "Logowanie..." : "Zaloguj się"}
      </button>
    </form>
  );
}
