export async function GET(request) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
    headers: { Authorization: request.headers.get("authorization") },
  });
  return Response.json(await res.json(), { status: res.status });
}

export async function POST(request) {
  const body = await request.json();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: request.headers.get("authorization"),
    },
    body: JSON.stringify(body),
  });
  return Response.json(await res.json(), { status: res.status });
}
