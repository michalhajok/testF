import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";

export default function PatientForm({ onSubmit, initialData = {} }) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Input
        label="Imię"
        name="firstName"
        required
        defaultValue={initialData.firstName}
      />
      <Input
        label="Nazwisko"
        name="lastName"
        required
        defaultValue={initialData.lastName}
      />
      <Input
        label="PESEL"
        name="pesel"
        required
        pattern="\d{11}"
        defaultValue={initialData.pesel}
      />
      <Input
        label="Data urodzenia"
        name="birthDate"
        type="date"
        required
        defaultValue={initialData.birthDate}
      />
      <Select
        label="Płeć"
        name="gender"
        options={[
          { value: "male", label: "Mężczyzna" },
          { value: "female", label: "Kobieta" },
        ]}
        defaultValue={initialData.gender}
      />
      {/* ...pozostałe pola */}
      <Button type="submit">Zapisz pacjenta</Button>
    </form>
  );
}
