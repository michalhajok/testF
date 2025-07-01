// src/app/(dashboard)/page.js
"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/context/AuthContext";
import Card from "@/components/ui/Card";
import Spinner from "@/components/ui/Spinner";

export default function DashboardPage() {
  const { state } = useApp();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Załaduj podstawowe statystyki
    setStats({
      totalPatients: 150,
      todayAppointments: 12,
      pendingExaminations: 5,
      completedVisits: 45,
    });
  }, []);

  if (!stats) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Pacjenci</h3>
          <p className="text-2xl font-bold text-gray-900">
            {stats.totalPatients}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">
            Dzisiejsze wizyty
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {stats.todayAppointments}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">
            Oczekujące badania
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {stats.pendingExaminations}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">
            Ukończone wizyty
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {stats.completedVisits}
          </p>
        </Card>
      </div>
    </section>
  );
}
