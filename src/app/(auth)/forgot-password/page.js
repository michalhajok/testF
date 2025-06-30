"use client";
import { useState } from "react";
import Link from "next/link";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import AuthHeader from "@/components/auth/AuthHeader";

export default function ForgotPasswordPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (email) => {
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AuthHeader />
      {success ? (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700">
          Jeśli podany adres email istnieje w naszym systemie, wysłaliśmy na
          niego link do resetowania hasła. Sprawdź swoją skrzynkę odbiorczą oraz
          folder spam.
          <div className="mt-4">
            <Link href="/login" className="text-blue-600 hover:underline">
              Powrót do logowania
            </Link>
          </div>
        </div>
      ) : (
        <>
          <ForgotPasswordForm onSubmit={handleSubmit} loading={loading} />
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
              {error}
            </div>
          )}
          <div className="mt-6 text-center text-sm">
            <Link href="/login" className="text-blue-600 hover:underline">
              Powrót do logowania
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
