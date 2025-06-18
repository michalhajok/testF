"use client";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    clinicName: "",
    address: "",
    phone: "",
    email: "",
  });

  // Pobierz aktualne ustawienia z API po zamontowaniu komponentu
  // useEffect(() => { ... }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wyślij dane do API
    // fetch('/api/settings', { method: 'PUT', body: JSON.stringify(settings) })
  };

  return (
    <section className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Ustawienia systemowe</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Nazwa kliniki"
          name="clinicName"
          value={settings.clinicName}
          onChange={handleChange}
          required
        />
        <Input
          label="Adres"
          name="address"
          value={settings.address}
          onChange={handleChange}
          required
        />
        <Input
          label="Telefon"
          name="phone"
          value={settings.phone}
          onChange={handleChange}
          required
        />
        <Input
          label="E-mail"
          name="email"
          value={settings.email}
          onChange={handleChange}
          required
        />
        <Button type="submit">Zapisz zmiany</Button>
      </form>
    </section>
  );
}
