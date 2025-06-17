export async function POST(request) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  return Response.json(await res.json(), { status: res.status });
}
