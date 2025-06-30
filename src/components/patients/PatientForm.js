"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { patientService } from "@/lib/services/patientService";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";

export default function PatientForm({ patient = null, mode = "create" }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: patient
      ? {
          firstName: patient.personalInfo.firstName,
          lastName: patient.personalInfo.lastName,
          pesel: patient.personalInfo.pesel,
          dateOfBirth: new Date(patient.personalInfo.dateOfBirth)
            .toISOString()
            .split("T")[0],
          gender: patient.personalInfo.gender,
          phone: patient.personalInfo.contact.phone,
          email: patient.personalInfo.contact.email,
          allergies: patient.medicalInfo.allergies.join(", "),
          chronicConditions: patient.medicalInfo.chronicConditions.join(", "),
          initialDiagnosis: patient.physiotherapyData.initialDiagnosis,
          referringPhysician: patient.physiotherapyData.referringPhysician,
        }
      : {},
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const patientData = {
        personalInfo: {
          firstName: data.firstName,
          lastName: data.lastName,
          pesel: data.pesel,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          contact: {
            phone: data.phone,
            email: data.email,
          },
        },
        medicalInfo: {
          allergies: data.allergies
            ? data.allergies.split(",").map((item) => item.trim())
            : [],
          chronicConditions: data.chronicConditions
            ? data.chronicConditions.split(",").map((item) => item.trim())
            : [],
          medications: [],
          medicalHistory: [],
        },
        physiotherapyData: {
          referringPhysician: data.referringPhysician || "",
          initialDiagnosis: data.initialDiagnosis || "",
          treatmentGoals: [],
          contraindications: [],
          specialNotes: "",
        },
        consentGiven: true,
        consentDate: new Date(),
      };

      if (mode === "create") {
        await patientService.create(patientData);
        toast.success("Pacjent został pomyślnie dodany");
      } else {
        await patientService.update(patient._id, patientData);
        toast.success("Dane pacjenta zostały zaktualizowane");
      }

      router.push("/dashboard/patients");
    } catch (error) {
      toast.error(
        `Błąd podczas ${
          mode === "create" ? "dodawania" : "aktualizacji"
        } pacjenta`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Dane osobowe</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Imię"
              {...register("firstName", { required: "Imię jest wymagane" })}
              error={errors.firstName?.message}
            />
            <Input
              label="Nazwisko"
              {...register("lastName", { required: "Nazwisko jest wymagane" })}
              error={errors.lastName?.message}
            />
            <Input
              label="PESEL"
              {...register("pesel", {
                required: "PESEL jest wymagany",
                pattern: {
                  value: /^\d{11}$/,
                  message: "PESEL musi składać się z 11 cyfr",
                },
              })}
              error={errors.pesel?.message}
            />
            <Input
              label="Data urodzenia"
              type="date"
              {...register("dateOfBirth", {
                required: "Data urodzenia jest wymagana",
              })}
              error={errors.dateOfBirth?.message}
            />
            <Select
              label="Płeć"
              {...register("gender", { required: "Płeć jest wymagana" })}
              error={errors.gender?.message}
            >
              <option value="">Wybierz płeć</option>
              <option value="M">Mężczyzna</option>
              <option value="F">Kobieta</option>
              <option value="Other">Inna</option>
            </Select>
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Dane kontaktowe</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Telefon"
              {...register("phone", {
                required: "Numer telefonu jest wymagany",
              })}
              error={errors.phone?.message}
            />
            <Input
              label="Email"
              type="email"
              {...register("email", {
                required: "Email jest wymagany",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Nieprawidłowy format email",
                },
              })}
              error={errors.email?.message}
            />
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Informacje medyczne</h3>
          <div className="space-y-4">
            <Input
              label="Alergie (oddzielone przecinkami)"
              {...register("allergies")}
              placeholder="np. penicylina, lateks"
            />
            <Input
              label="Choroby przewlekłe (oddzielone przecinkami)"
              {...register("chronicConditions")}
              placeholder="np. cukrzyca, nadciśnienie"
            />
            <Input
              label="Lekarz kierujący"
              {...register("referringPhysician")}
            />
            <Input label="Wstępna diagnoza" {...register("initialDiagnosis")} />
          </div>
        </div>
      </Card>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Anuluj
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting
            ? "Zapisywanie..."
            : mode === "create"
            ? "Dodaj pacjenta"
            : "Zapisz zmiany"}
        </Button>
      </div>
    </form>
  );
}
