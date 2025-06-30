"use client";
import { useState } from "react";

export default function RegisterForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "physiotherapist",
    licenseNumber: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "Imię jest wymagane";
    if (!formData.lastName) newErrors.lastName = "Nazwisko jest wymagane";
    if (!formData.email) {
      newErrors.email = "Email jest wymagany";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Niepoprawny format adresu email";
    }
    if (!formData.password) {
      newErrors.password = "Hasło jest wymagane";
    } else if (formData.password.length < 8) {
      newErrors.password = "Hasło musi zawierać co najmniej 8 znaków";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Hasło musi zawierać małą i dużą literę oraz cyfrę";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Hasła nie są identyczne";
    }
    if (formData.role === "physiotherapist" && !formData.licenseNumber) {
      newErrors.licenseNumber =
        "Numer licencji jest wymagany dla fizjoterapeuty";
    }
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Musisz zaakceptować regulamin i politykę RODO";
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
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      aria-label="Formularz rejestracji"
    >
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium mb-1">
          Imię
        </label>
        <input
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          disabled={loading}
          className={`w-full px-3 py-2 border rounded ${
            errors.firstName ? "border-red-500" : "border-gray-300"
          }`}
          aria-invalid={!!errors.firstName}
        />
        {errors.firstName && (
          <span className="text-xs text-red-600">{errors.firstName}</span>
        )}
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium mb-1">
          Nazwisko
        </label>
        <input
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          disabled={loading}
          className={`w-full px-3 py-2 border rounded ${
            errors.lastName ? "border-red-500" : "border-gray-300"
          }`}
          aria-invalid={!!errors.lastName}
        />
        {errors.lastName && (
          <span className="text-xs text-red-600">{errors.lastName}</span>
        )}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
          className={`w-full px-3 py-2 border rounded ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <span className="text-xs text-red-600">{errors.email}</span>
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
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
          className={`w-full px-3 py-2 border rounded ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          aria-invalid={!!errors.password}
        />
        {errors.password && (
          <span className="text-xs text-red-600">{errors.password}</span>
        )}
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium mb-1"
        >
          Powtórz hasło
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={loading}
          className={`w-full px-3 py-2 border rounded ${
            errors.confirmPassword ? "border-red-500" : "border-gray-300"
          }`}
          aria-invalid={!!errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <span className="text-xs text-red-600">{errors.confirmPassword}</span>
        )}
      </div>
      <div>
        <label htmlFor="role" className="block text-sm font-medium mb-1">
          Rola
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          disabled={loading}
          className="w-full px-3 py-2 border rounded"
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
            className="block text-sm font-medium mb-1"
          >
            Numer licencji
          </label>
          <input
            id="licenseNumber"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            disabled={loading}
            className={`w-full px-3 py-2 border rounded ${
              errors.licenseNumber ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.licenseNumber}
          />
          {errors.licenseNumber && (
            <span className="text-xs text-red-600">{errors.licenseNumber}</span>
          )}
        </div>
      )}
      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            disabled={loading}
            className="mr-2"
          />
          Akceptuję regulamin i politykę RODO
        </label>
        {errors.acceptTerms && (
          <span className="text-xs text-red-600 block">
            {errors.acceptTerms}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? "Rejestracja..." : "Zarejestruj się"}
      </button>
    </form>
  );
}
