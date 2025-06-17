export async function GET(request) {
  // Pobierz listę pacjentów z backendu
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patients`, {
    headers: { Authorization: request.headers.get("authorization") },
  });
  const data = await res.json();
  return Response.json(data, { status: res.status });
}

export async function POST(request) {
  const body = await request.json();
  // Przekaż dane do backendu (np. dodaj pacjenta)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: request.headers.get("authorization"),
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return Response.json(data, { status: res.status });
}
