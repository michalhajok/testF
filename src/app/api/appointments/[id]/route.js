export async function GET(request, { params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/appointments/${params.id}`,
    {
      headers: { Authorization: request.headers.get("authorization") },
    }
  );
  return Response.json(await res.json(), { status: res.status });
}

export async function PUT(request, { params }) {
  const body = await request.json();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/appointments/${params.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: request.headers.get("authorization"),
      },
      body: JSON.stringify(body),
    }
  );
  return Response.json(await res.json(), { status: res.status });
}

export async function DELETE(request, { params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/appointments/${params.id}`,
    {
      method: "DELETE",
      headers: { Authorization: request.headers.get("authorization") },
    }
  );
  return Response.json(await res.json(), { status: res.status });
}
