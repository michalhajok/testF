"use client";
import { useEffect, useState } from "react";
import PatientList from "@/components/patients/PatientList";
import Button from "@/components/ui/Button";

export default function ReceptionistPatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Pacjenci</h1>
        <Button
          onClick={() => {
            /* otwórz modal dodawania */
          }}
        >
          Dodaj pacjenta
        </Button>
      </div>
      {loading ? <div>Ładowanie...</div> : <PatientList patients={patients} />}
    </section>
  );
}
