"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import AuthHeader from "@/components/auth/AuthHeader";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleLogin = async (credentials) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (response.ok) {
        // Możesz tu zapisać token do localStorage/cookies jeśli backend go zwraca
        router.push(callbackUrl);
      } else {
        setError(data.message || "Wystąpił błąd podczas logowania");
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
      <LoginForm onSubmit={handleLogin} loading={loading} />
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}
      <div className="mt-6 flex flex-col gap-2 text-center text-sm">
        <span>
          Nie masz jeszcze konta?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Zarejestruj się
          </Link>
        </span>
        <Link href="/forgot-password" className="text-blue-600 hover:underline">
          Zapomniałeś hasła?
        </Link>
      </div>
    </div>
  );
}
