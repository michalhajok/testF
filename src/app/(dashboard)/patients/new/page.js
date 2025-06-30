import PatientForm from "@/components/patients/PatientForm";

export default function NewPatientPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Dodaj nowego pacjenta
        </h1>
      </div>
      <PatientForm mode="create" />
    </div>
  );
}
