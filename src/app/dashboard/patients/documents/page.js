"use client";
import { useEffect, useState } from "react";
import Table from "@/components/ui/Table";
import Button from "@/components/ui/Button";

export default function PatientDocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/patients/me/documents")
      .then((res) => res.json())
      .then((data) => setDocuments(data))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { key: "name", label: "Nazwa dokumentu" },
    { key: "date", label: "Data dodania" },
    { key: "type", label: "Typ" },
    { key: "actions", label: "Akcje" },
  ];

  const data = documents.map((doc) => ({
    ...doc,
    actions: (
      <Button variant="primary" onClick={() => window.open(doc.url, "_blank")}>
        Pobierz
      </Button>
    ),
  }));

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Moje dokumenty</h1>
      {loading ? (
        <div>Ładowanie...</div>
      ) : (
        <Table columns={columns} data={data} />
      )}
    </section>
  );
}
