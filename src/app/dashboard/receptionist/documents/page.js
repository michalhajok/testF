"use client";
import { useEffect, useState } from "react";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";

export default function ReceptionistDocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/documents")
      .then((res) => res.json())
      .then((data) => setDocuments(data))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { key: "name", label: "Nazwa dokumentu" },
    { key: "patient", label: "Pacjent" },
    { key: "date", label: "Data wydania" },
    { key: "type", label: "Typ" },
    { key: "actions", label: "Akcje" },
  ];

  const data = documents.map((doc) => ({
    ...doc,
    actions: (
      <div className="flex gap-2">
        <Button
          variant="primary"
          onClick={() => window.open(doc.url, "_blank")}
        >
          Pobierz
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            /* wydaj dokument */
          }}
        >
          Wydaj
        </Button>
      </div>
    ),
  }));

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dokumenty</h1>
      {loading ? (
        <div>Ładowanie...</div>
      ) : (
        <Table columns={columns} data={data} />
      )}
    </section>
  );
}
