"use client";
import { useEffect, useState } from "react";
import PatientList from "@/components/patients/PatientList";

export default function PhysiotherapistPatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/patients?assignedTo=me")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Moi pacjenci</h1>
      {loading ? <div>Ładowanie...</div> : <PatientList patients={patients} />}
    </section>
  );
}
