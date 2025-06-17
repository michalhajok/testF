import Avatar from "../ui/Avatar";

export default function PatientCard({ patient }) {
  return (
    <div className="medical-card flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <Avatar
          src={patient.avatar}
          initials={`${patient.firstName[0]}${patient.lastName[0]}`}
        />
        <div>
          <div className="font-bold">
            {patient.firstName} {patient.lastName}
          </div>
          <div className="text-sm text-gray-500">{patient.email}</div>
        </div>
      </div>
      <div className="text-sm text-gray-600">PESEL: {patient.pesel}</div>
      <div className="text-sm text-gray-600">Telefon: {patient.phone}</div>
      <div className="text-sm text-gray-600">
        Status:
        <span
          className={`ml-2 patient-status ${
            patient.active
              ? "patient-status--active"
              : "patient-status--inactive"
          }`}
        >
          {patient.active ? "Aktywny" : "Nieaktywny"}
        </span>
      </div>
    </div>
  );
}
