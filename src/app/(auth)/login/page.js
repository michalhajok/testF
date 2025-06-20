"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import AuthHeader from "@/components/auth/AuthHeader";

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to dashboard after successful login
        router.push("/dashboard");
      } else {
        setError(data.message || "Wystąpił błąd podczas logowania");
      }
    } catch (err) {
      setError("Błąd połączenia z serwerem");
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <AuthHeader title="Logowanie" />

      {error && (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
          <p>{error}</p>
        </div>
      )}

      <LoginForm onSubmit={handleLogin} />

      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600">
          Nie masz jeszcze konta?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Zarejestruj się
          </Link>
        </p>
        <p className="mt-2">
          <Link
            href="/forgot-password"
            className="text-blue-600 hover:underline"
          >
            Zapomniałeś hasła?
          </Link>
        </p>
      </div>
    </div>
  );
}
