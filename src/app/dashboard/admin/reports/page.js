"use client";
import { useState } from "react";
import LineChart from "@/components/charts/LineChart";
import BarChart from "@/components/charts/BarChart";
import Button from "@/components/ui/Button";

export default function AdminReportsPage() {
  const [period, setPeriod] = useState("month");

  // Przykładowe dane do wykresów
  const lineData = [
    { label: "Styczeń", value: 1000 },
    { label: "Luty", value: 1200 },
    { label: "Marzec", value: 900 },
  ];
  const barData = [
    { label: "Fizjoterapeuci", value: 30 },
    { label: "Recepcjoniści", value: 5 },
  ];

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Raporty</h1>
      <div className="flex gap-4 mb-6">
        <Button
          variant={period === "month" ? "primary" : "secondary"}
          onClick={() => setPeriod("month")}
        >
          Miesiąc
        </Button>
        <Button
          variant={period === "year" ? "primary" : "secondary"}
          onClick={() => setPeriod("year")}
        >
          Rok
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-semibold mb-2">Przychód</h2>
          <LineChart data={lineData} />
        </div>
        <div>
          <h2 className="font-semibold mb-2">Liczba pracowników wg roli</h2>
          <BarChart data={barData} />
        </div>
      </div>
    </section>
  );
}
