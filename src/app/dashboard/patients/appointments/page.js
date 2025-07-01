"use client";
import { useEffect, useState } from "react";
import AppointmentList from "@/components/appointments/AppointmentList";

export default function PatientAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/appointments?patient=me")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Moje wizyty</h1>
      {loading ? (
        <div>Ładowanie...</div>
      ) : (
        <AppointmentList appointments={appointments} />
      )}
    </section>
  );
}
