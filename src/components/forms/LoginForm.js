import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function LoginForm({ onSubmit, error }) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Input label="E-mail" name="email" type="email" required />
      <Input label="Hasło" name="password" type="password" required />
      {error && <p className="text-medical-danger">{error}</p>}
      <Button type="submit">Zaloguj się</Button>
    </form>
  );
}
