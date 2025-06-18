"use client";
import StatsCard from "@/components/dashboard/StatsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default function PatientDashboardPage() {
  // Przykładowe dane – w praktyce pobierane z API
  const stats = [
    { icon: "🗓️", title: "Nadchodzące wizyty", value: 2, change: 0 },
    { icon: "📄", title: "Dokumenty", value: 5, change: 0 },
    { icon: "🩺", title: "Badania", value: 1, change: 0 },
  ];

  const actions = [
    {
      label: "Umów wizytę",
      icon: "➕",
      onClick: () => {
        /* ... */
      },
    },
    {
      label: "Pobierz dokument",
      icon: "📥",
      onClick: () => {
        /* ... */
      },
    },
    {
      label: "Zobacz historię",
      icon: "📜",
      onClick: () => {
        /* ... */
      },
    },
  ];

  const activities = [
    {
      type: "info",
      message: "Wizyta potwierdzona: 21.06.2025",
      time: "wczoraj",
    },
    { type: "success", message: "Dodano nowy dokument", time: "2 dni temu" },
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
