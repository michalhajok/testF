import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="flex gap-6">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/patients">Pacjenci</Link>
      <Link href="/appointments">Wizyty</Link>
      {/* ... */}
    </nav>
  );
}
