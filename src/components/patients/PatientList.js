export default function PatientList({ patients }) {
  return (
    <div className="medical-card">
      <h3 className="text-lg font-semibold mb-4">Lista pacjentów</h3>
      <table className="min-w-full">
        <thead>
          <tr>
            <th>Imię i nazwisko</th>
            <th>PESEL</th>
            <th>Telefon</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id}>
              <td>
                {patient.firstName} {patient.lastName}
              </td>
              <td>{patient.pesel}</td>
              <td>{patient.phone}</td>
              <td>
                <span
                  className={`patient-status ${
                    patient.active
                      ? "patient-status--active"
                      : "patient-status--inactive"
                  }`}
                >
                  {patient.active ? "Aktywny" : "Nieaktywny"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
