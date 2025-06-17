import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { DatePicker } from "../components/ui/datepicker";

export default function AppointmentForm({
  patients,
  therapists,
  services,
  onSubmit,
  initialData = {},
}) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Select
        label="Pacjent"
        name="patientId"
        options={patients}
        defaultValue={initialData.patientId}
        required
      />
      <Select
        label="Fizjoterapeuta"
        name="therapistId"
        options={therapists}
        defaultValue={initialData.therapistId}
        required
      />
      <DatePicker
        label="Data i godzina"
        name="datetime"
        required
        defaultValue={initialData.datetime}
      />
      <Select
        label="Usługa"
        name="serviceId"
        options={services}
        defaultValue={initialData.serviceId}
        required
      />
      <Input label="Notatka" name="note" defaultValue={initialData.note} />
      <Button type="submit">Zarezerwuj wizytę</Button>
    </form>
  );
}
