import PatientForm from "@/components/patients/PatientForm";

export default function NewPatientPage() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Dodaj nowego pacjenta</h2>
      <PatientForm mode="create" />
    </section>
  );
}
