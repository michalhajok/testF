"use client";

import { useState } from "react";

export default function RegisterForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "physiotherapist", // Default role
    licenseNumber: "", // For medical staff
    acceptTerms: false,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // Required fields
    if (!formData.firstName) newErrors.firstName = "Imię jest wymagane";
    if (!formData.lastName) newErrors.lastName = "Nazwisko jest wymagane";

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email jest wymagany";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Niepoprawny format adresu email";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Hasło jest wymagane";
    } else if (formData.password.length < 8) {
      newErrors.password = "Hasło musi zawierać co najmniej 8 znaków";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Hasło musi zawierać małą i dużą literę oraz cyfrę";
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Hasła nie są identyczne";
    }

    // License number for medical staff
    if (formData.role === "physiotherapist" && !formData.licenseNumber) {
      newErrors.licenseNumber =
        "Numer licencji jest wymagany dla fizjoterapeuty";
    }

    // Terms acceptance
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Musisz zaakceptować regulamin i politykę RODO";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error on input change
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Imię
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            disabled={loading}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none ${
              errors.firstName
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
            }`}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nazwisko
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            disabled={loading}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none ${
              errors.lastName
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
            }`}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>
      </div>

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
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          disabled={loading}
          className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none ${
            errors.email
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Rola w systemie
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:outline-none"
        >
          <option value="physiotherapist">Fizjoterapeuta</option>
          <option value="receptionist">Recepcjonista</option>
          <option value="admin">Administrator</option>
        </select>
      </div>

      {formData.role === "physiotherapist" && (
        <div>
          <label
            htmlFor="licenseNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Numer licencji
          </label>
          <input
            type="text"
            id="licenseNumber"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            disabled={loading}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none ${
              errors.licenseNumber
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
            }`}
          />
          {errors.licenseNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>
          )}
        </div>
      )}

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Hasło
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
          disabled={loading}
          className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none ${
            errors.password
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
          }`}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Hasło musi mieć co najmniej 8 znaków i zawierać małą i dużą literę
          oraz cyfrę.
        </p>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Powtórz hasło
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
          disabled={loading}
          className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:outline-none ${
            errors.confirmPassword
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
          }`}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="flex items-start">
        <input
          type="checkbox"
          id="acceptTerms"
          name="acceptTerms"
          checked={formData.acceptTerms}
          onChange={handleChange}
          className="h-4 w-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label
          htmlFor="acceptTerms"
          className="ml-2 block text-sm text-gray-700"
        >
          Akceptuję{" "}
          <a href="/terms" className="text-blue-600 hover:underline">
            regulamin
          </a>{" "}
          i{" "}
          <a href="/privacy" className="text-blue-600 hover:underline">
            politykę RODO
          </a>
        </label>
      </div>
      {errors.acceptTerms && (
        <p className="mt-1 text-sm text-red-600">{errors.acceptTerms}</p>
      )}

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 mt-4 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 
                    text-white font-medium rounded-md focus:outline-none transition
                    disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Rejestracja..." : "Zarejestruj się"}
        </button>
      </div>
    </form>
  );
}
