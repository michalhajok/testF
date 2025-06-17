import MedicalHistory from "./MedicalHistory";

export default function PatientProfile({ patient }) {
  return (
    <section className="medical-card">
      <h2 className="text-xl font-bold mb-2">Profil pacjenta</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div>
            <b>Imię:</b> {patient.firstName}
          </div>
          <div>
            <b>Nazwisko:</b> {patient.lastName}
          </div>
          <div>
            <b>PESEL:</b> {patient.pesel}
          </div>
          <div>
            <b>Data urodzenia:</b> {patient.birthDate}
          </div>
        </div>
        <div>
          <div>
            <b>Telefon:</b> {patient.phone}
          </div>
          <div>
            <b>Email:</b> {patient.email}
          </div>
          <div>
            <b>Status:</b> {patient.active ? "Aktywny" : "Nieaktywny"}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <b>Historia medyczna:</b>
        <MedicalHistory history={patient.medicalHistory} />
      </div>
    </section>
  );
}
