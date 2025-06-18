"use client";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import NotificationCenter from "@/components/dashboard/NotificationCenter";

export default function AdminDashboardPage() {
  // Przykładowe dane – w praktyce pobierane z API
  const stats = [
    { icon: "👥", title: "Pacjenci", value: 1234, change: 4 },
    { icon: "🗓️", title: "Wizyty", value: 321, change: -2 },
    { icon: "💰", title: "Przychód", value: "12 300 zł", change: 8 },
    { icon: "👨‍⚕️", title: "Pracownicy", value: 12, change: 0 },
  ];

  const actions = [
    {
      label: "Dodaj pacjenta",
      icon: "➕",
      onClick: () => {
        /* ... */
      },
    },
    {
      label: "Umów wizytę",
      icon: "📅",
      onClick: () => {
        /* ... */
      },
    },
    {
      label: "Wygeneruj raport",
      icon: "📊",
      onClick: () => {
        /* ... */
      },
    },
  ];

  const activities = [
    { type: "success", message: "Nowy pacjent: Jan Nowak", time: "5 min temu" },
    {
      type: "info",
      message: "Wizyta zakończona: Anna Kowalska",
      time: "10 min temu",
    },
  ];

  return (
    <main className="grid grid-cols-1 xl:grid-cols-2 gap-6 p-6">
      <section className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatsCard key={i} {...s} />
          ))}
        </div>
        <QuickActions actions={actions} />
        <RecentActivity activities={activities} />
      </section>
      <aside>
        <NotificationCenter />
      </aside>
    </main>
  );
}
