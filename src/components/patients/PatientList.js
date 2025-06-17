// components/PatientList.js
import { usePatientManagement } from "../hooks/usePatientManagement";

export const PatientList = () => {
  const { patients, loading, error } = usePatientManagement();

  if (loading) return <div>Ładowanie pacjentów...</div>;
  if (error) return <div>Błąd: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {patients.map((patient) => (
        <div key={patient._id} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">{patient.name}</h3>
          <p className="text-gray-600">{patient.email}</p>
        </div>
      ))}
    </div>
  );
};
