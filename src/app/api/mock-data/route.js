export async function GET() {
  // Przykładowe dane do developmentu/testów
  return Response.json([
    { id: 1, name: "Jan Kowalski", pesel: "90010112345", active: true },
    { id: 2, name: "Anna Nowak", pesel: "85050567890", active: false },
  ]);
}
