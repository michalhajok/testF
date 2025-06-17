import Link from "next/link";

export default function Sidebar({ role }) {
  const menu = {
    admin: [
      /* ... */
    ],
    physiotherapist: [
      /* ... */
    ],
    receptionist: [
      /* ... */
    ],
    patient: [
      /* ... */
    ],
  };
  return (
    <aside className="sidebar bg-white shadow-medical p-4 w-64 min-h-screen">
      <nav>
        <ul className="space-y-2">
          {menu[role].map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className="block py-2 px-3 rounded hover:bg-medical-light"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
