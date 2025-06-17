import AppointmentCard from "./AppointmentCard";

export default function AppointmentList({ appointments }) {
  return (
    <ul>
      {appointments.map((appt) => (
        <AppointmentCard key={appt._id} appointment={appt} />
      ))}
    </ul>
  );
}
