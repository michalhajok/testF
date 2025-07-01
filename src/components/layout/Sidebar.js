import Link from "next/link";
import { useRouter } from "next/navigation";

const menuItems = {
  admin: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Pacjenci", path: "/dashboard/patients" },
    { label: "Wizyty", path: "/dashboard/appointments" },
    { label: "Pracownicy", path: "/dashboard/employees" },
    { label: "Dokumenty", path: "/dashboard/documents" },
    { label: "Raporty", path: "/dashboard/reports" },
    { label: "Ustawienia", path: "/dashboard/admin/settings" },
  ],
  physiotherapist: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Moi Pacjenci", path: "/dashboard/patients" },
    { label: "Wizyty", path: "/dashboard/appointments" },
    { label: "Badania", path: "/dashboard/examinations" },
    { label: "Dokumenty", path: "/dashboard/documents" },
  ],
  receptionist: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Pacjenci", path: "/dashboard/patients" },
    { label: "Rezerwacje", path: "/dashboard/appointments" },
    { label: "Dokumenty", path: "/dashboard/documents" },
  ],
  patient: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Moje Wizyty", path: "/dashboard/appointments" },
    { label: "Dokumenty", path: "/dashboard/documents" },
    { label: "Badania", path: "/dashboard/examinations" },
  ],
};

export default function Sidebar({ role }) {
  const router = useRouter();
  const items = menuItems[role] || [];

  return (
    <aside className="sidebar bg-white shadow-medical p-4 w-64 min-h-screen">
      <nav>
        <ul className="space-y-2">
          {items.map(({ label, path }) => {
            const isActive = router.pathname === path;
            return (
              <li key={path}>
                <Link
                  href={path}
                  className={
                    "block py-2 px-3 rounded " +
                    (isActive
                      ? "bg-medical-primary text-white"
                      : "hover:bg-medical-light text-gray-700")
                  }
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
