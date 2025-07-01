"use client";
import { useEffect, useState } from "react";
import AppointmentCalendar from "@/components/appointments/AppointmentCalendar";

export default function PhysiotherapistSchedulePage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/appointments?assignedTo=me")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mój harmonogram</h1>
      {loading ? (
        <div>Ładowanie...</div>
      ) : (
        <AppointmentCalendar appointments={appointments} />
      )}
    </section>
  );
}
