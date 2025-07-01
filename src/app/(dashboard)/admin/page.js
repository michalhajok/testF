// src/app/(dashboard)/admin/page.js
"use client";
import { useEffect, useState } from "react";
import { adminService } from "@/lib/services/adminService";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setStats(await adminService.getDashboardStats());
      } catch {
        /* obsłuż błąd */
      } finally {
        setLoad(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <div className="p-12 text-center">
        <Spinner />
      </div>
    );

  return (
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
  );
}
