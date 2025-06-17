import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function ExaminationForm({
  patient,
  onSubmit,
  initialData = {},
}) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Input
        label="Data badania"
        name="date"
        type="date"
        required
        defaultValue={initialData.date}
      />
      <Input
        label="Opis dolegliwości"
        name="symptoms"
        required
        defaultValue={initialData.symptoms}
      />
      <Input
        label="Wyniki testów"
        name="tests"
        defaultValue={initialData.tests}
      />
      <Input
        label="Zalecenia"
        name="recommendations"
        defaultValue={initialData.recommendations}
      />
      <Button type="submit">Zapisz badanie</Button>
    </form>
  );
}
