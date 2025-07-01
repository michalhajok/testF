// src/app/api/auth/login/route.js
import { NextResponse } from "next/server";
import { apiClient } from "@/lib/api/client";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Walidacja podstawowa
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email i hasło są wymagane" },
        { status: 400 }
      );
    }

    // Wywołanie do backendu
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Błąd logowania" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Utworzenie response z cookie
    const loginResponse = NextResponse.json({
      success: true,
      user: data.user,
      token: data.token,
    });

    // Ustawienie HTTP-only cookie
    loginResponse.cookies.set("auth-token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 dni
    });

    return loginResponse;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Wewnętrzny błąd serwera" },
      { status: 500 }
    );
  }
}
