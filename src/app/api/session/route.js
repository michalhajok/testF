// src/app/api/auth/session/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // Weryfikuj token (jeśli używasz JWT)
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return NextResponse.json({ user: decoded });
    } catch (jwtError) {
      return NextResponse.json({ user: null }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
