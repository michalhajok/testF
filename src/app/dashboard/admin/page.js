"use client";

import { useEffect, useState } from "react";
import { adminService } from "@/lib/services/adminService";
import Card from "@/components/ui/Card";
import Spinner from "@/components/ui/Spinner";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    adminService.getDashboardStats().then(setStats);
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
      <h2 className="text-2xl font-semibold mb-6">Panel Administratora</h2>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {stats.cards.map(({ title, value, diff }) => (
          <Card key={title} className="p-6">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-3xl font-semibold">{value}</p>
            <p
              className={`mt-1 text-sm ${
                diff >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {diff >= 0 ? "+" : ""}
              {diff}% od poprzedniego okresu
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
