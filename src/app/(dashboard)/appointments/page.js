import AppointmentCalendar from "@/components/appointments/AppointmentCalendar";

export default function AppointmentsPage() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Kalendarz wizyt</h2>
      <AppointmentCalendar />
    </section>
  );
}
