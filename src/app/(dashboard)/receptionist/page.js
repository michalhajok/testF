"use client";
import StatsCard from "@/components/dashboard/StatsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default function ReceptionistDashboardPage() {
  // Przykładowe dane – w praktyce pobierane z API
  const stats = [
    { icon: "🗓️", title: "Dzisiejsze wizyty", value: 18, change: 1 },
    { icon: "👥", title: "Nowi pacjenci", value: 3, change: 1 },
    { icon: "📄", title: "Dokumenty do wydania", value: 7, change: 0 },
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
      label: "Wydaj dokument",
      icon: "📄",
      onClick: () => {
        /* ... */
      },
    },
  ];

  const activities = [
    { type: "info", message: "Nowy pacjent: Anna Nowak", time: "15 min temu" },
    {
      type: "success",
      message: "Wydano dokument: Jan Kowalski",
      time: "30 min temu",
    },
  ];

  return (
    <main className="grid grid-cols-1 xl:grid-cols-2 gap-6 p-6">
      <section className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <StatsCard key={i} {...s} />
          ))}
        </div>
        <QuickActions actions={actions} />
        <RecentActivity activities={activities} />
      </section>
    </main>
  );
}
