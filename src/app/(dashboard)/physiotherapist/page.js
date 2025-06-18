"use client";
import StatsCard from "@/components/dashboard/StatsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default function PhysiotherapistDashboardPage() {
  // Przykładowe dane – w praktyce pobierane z API
  const stats = [
    { icon: "👥", title: "Moi pacjenci", value: 42, change: 2 },
    { icon: "🗓️", title: "Dzisiejsze wizyty", value: 7, change: 0 },
    { icon: "📝", title: "Badania", value: 3, change: 1 },
  ];

  const actions = [
    {
      label: "Dodaj badanie",
      icon: "➕",
      onClick: () => {
        /* ... */
      },
    },
    {
      label: "Zobacz harmonogram",
      icon: "📅",
      onClick: () => {
        /* ... */
      },
    },
    {
      label: "Nowy pacjent",
      icon: "🧑‍⚕️",
      onClick: () => {
        /* ... */
      },
    },
  ];

  const activities = [
    { type: "info", message: "Wizyta: Jan Nowak", time: "10:00" },
    {
      type: "success",
      message: "Dodano badanie: Anna Kowalska",
      time: "09:30",
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
