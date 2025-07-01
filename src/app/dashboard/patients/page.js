// src/app/(dashboard)/patients/page.js
"use client";

import PatientList from "@/components/patients/PatientList";

export default function PatientsPage() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Zarządzanie Pacjentami</h2>
      <PatientList />
    </section>
  );
}
