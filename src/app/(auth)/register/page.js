"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";
import AuthHeader from "@/components/auth/AuthHeader";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (userData) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Redirect to login page after a short delay
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setError(data.message || "Wystąpił błąd podczas rejestracji");
      }
    } catch (err) {
      setError("Błąd połączenia z serwerem");
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <AuthHeader
        title="Rejestracja"
        subtitle="Utwórz konto w systemie FizjoMed"
      />

      {error && (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
          <p>{error}</p>
        </div>
      )}

      {success ? (
        <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
          <p>
            Rejestracja zakończona pomyślnie! Za chwilę zostaniesz przekierowany
            na stronę logowania.
          </p>
        </div>
      ) : (
        <RegisterForm onSubmit={handleRegister} />
      )}

      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600">
          Masz już konto?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Zaloguj się
          </Link>
        </p>
      </div>
    </div>
  );
}
