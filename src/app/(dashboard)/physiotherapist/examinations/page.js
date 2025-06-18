"use client";
import { useEffect, useState } from "react";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";

export default function PhysiotherapistExaminationsPage() {
  const [examinations, setExaminations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/examinations?performedBy=me")
      .then((res) => res.json())
      .then((data) => setExaminations(data))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { key: "patientName", label: "Pacjent" },
    { key: "date", label: "Data" },
    { key: "type", label: "Typ badania" },
    { key: "result", label: "Wynik" },
    { key: "actions", label: "Akcje" },
  ];

  const data = examinations.map((exam) => ({
    ...exam,
    actions: (
      <Button
        variant="secondary"
        onClick={() => {
          /* szczegóły */
        }}
      >
        Szczegóły
      </Button>
    ),
  }));

  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Badania</h1>
        <Button
          onClick={() => {
            /* otwórz modal dodawania */
          }}
        >
          Dodaj badanie
        </Button>
      </div>
      {loading ? (
        <div>Ładowanie...</div>
      ) : (
        <Table columns={columns} data={data} />
      )}
    </section>
  );
}
