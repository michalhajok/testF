"use client";

import { useState } from "react";
import Link from "next/link";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import AuthHeader from "@/components/auth/AuthHeader";

export default function ForgotPasswordPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (email) => {
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(
          data.message || "Wystąpił błąd podczas wysyłania linku resetującego"
        );
      }
    } catch (err) {
      setError("Błąd połączenia z serwerem");
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <AuthHeader
        title="Resetowanie hasła"
        subtitle="Podaj swój adres email, aby otrzymać link do resetowania hasła"
      />

      {error && (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
          <p>{error}</p>
        </div>
      )}

      {success ? (
        <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
          <p>
            Jeśli podany adres email istnieje w naszym systemie, wysłaliśmy na
            niego link do resetowania hasła. Sprawdź swoją skrzynkę odbiorczą
            oraz folder spam.
          </p>
        </div>
      ) : (
        <ForgotPasswordForm onSubmit={handleSubmit} />
      )}

      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600">
          <Link href="/login" className="text-blue-600 hover:underline">
            Powrót do logowania
          </Link>
        </p>
      </div>
    </div>
  );
}
