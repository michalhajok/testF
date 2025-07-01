"use client";
import { useEffect, useState } from "react";
import AppointmentList from "@/components/appointments/AppointmentList";
import Button from "@/components/ui/Button";

export default function ReceptionistAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Wizyty</h1>
        <Button
          onClick={() => {
            /* otwórz modal umawiania */
          }}
        >
          Umów wizytę
        </Button>
      </div>
      {loading ? (
        <div>Ładowanie...</div>
      ) : (
        <AppointmentList appointments={appointments} />
      )}
    </section>
  );
}
