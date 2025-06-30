"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";
import AuthHeader from "@/components/auth/AuthHeader";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (userData) => {
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setError(data.message || "Wystąpił błąd podczas rejestracji");
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
          Rejestracja zakończona pomyślnie! Za chwilę zostaniesz przekierowany
          na stronę logowania.
        </div>
      ) : (
        <>
          <RegisterForm onSubmit={handleRegister} loading={loading} />
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
              {error}
            </div>
          )}
          <div className="mt-6 text-center text-sm">
            Masz już konto?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Zaloguj się
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
