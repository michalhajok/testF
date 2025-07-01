import PatientList from "@/components/patients/PatientList";

export default function PatientsPage() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Pacjenci</h2>
      <PatientList />
    </section>
  );
}
