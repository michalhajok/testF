export default function AppointmentCard({ appointment }) {
  return (
    <div className="medical-card flex items-center justify-between">
      <div>
        <div>{appointment.patientName}</div>
        <div>{appointment.time}</div>
        <div
          className={`appointment-status appointment-status--${appointment.status}`}
        >
          {appointment.status}
        </div>
      </div>
      {/* Akcje: edytuj, anuluj */}
    </div>
  );
}
