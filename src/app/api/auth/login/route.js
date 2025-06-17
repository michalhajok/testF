export async function POST(request) {
  const body = await request.json();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  // Możesz ustawić cookie HttpOnly z tokenem JWT, jeśli to wymagane
  return Response.json(data, { status: res.status });
}
