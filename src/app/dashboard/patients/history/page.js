"use client";
import { useEffect, useState } from "react";
import MedicalHistory from "@/components/patients/MedicalHistory";

export default function PatientHistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/patients/me/history")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Historia medyczna</h1>
      {loading ? <div>Ładowanie...</div> : <MedicalHistory history={history} />}
    </section>
  );
}
