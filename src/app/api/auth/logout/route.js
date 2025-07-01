// src/app/api/auth/logout/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Usuń cookie auth-token
    const response = NextResponse.json({
      success: true,
      message: "Wylogowano pomyślnie",
    });

    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0, // Natychmiastowe wygaśnięcie
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Błąd podczas wylogowywania" },
      { status: 500 }
    );
  }
}
