// src/app/(dashboard)/admin/settings/page.js
"use client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { adminService } from "@/lib/services/adminService";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { toast } from "react-hot-toast";

export default function SettingsPage() {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    adminService.getSystemSettings().then(reset);
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      await adminService.updateSystemSettings(data);
      toast.success("Zapisano ustawienia");
    } catch {
      toast.error("Błąd zapisu");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="p-6 space-y-4">
        <Input label="Nazwa placówki" {...register("facilityName")} />
        <Input label="Domyślny email" {...register("defaultEmail")} />
        <Input label="Telefon kontaktowy" {...register("contactPhone")} />
      </Card>
      <Button variant="primary">Zapisz zmiany</Button>
    </form>
  );
}
