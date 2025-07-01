// src/app/api/auth/login/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email i hasło są wymagane" },
        { status: 400 }
      );
    }

    // Komunikacja z backendem na porcie 3001
    const backendUrl = process.env.BACKEND_URL || "http://localhost:3001";
    const response = await fetch(`${backendUrl}/api/auth/login`, {
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

    // Backend zwraca: { success: true, data: { user, tokens } }
    // Wyciągnij token z zagnieżdżonej struktury
    const token = data.data?.tokens?.accessToken;
    const user = data.data?.user;

    if (!token) {
      return NextResponse.json(
        { error: "Brak tokenu w odpowiedzi" },
        { status: 500 }
      );
    }

    const loginResponse = NextResponse.json({
      success: true,
      user: user,
      token: token, // Frontend oczekuje tokenu w głównym obiekcie
    });

    // Ustaw cookie
    loginResponse.cookies.set("auth-token", token, {
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
