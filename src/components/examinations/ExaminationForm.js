"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { examinationService } from "@/lib/services/examinationService";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";

export default function ExaminationForm({
  patientId,
  examination = null,
  mode = "create",
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: examination || {
      painScale: 0,
      chiefComplaint: "",
      historyOfPresentIllness: "",
      pastMedicalHistory: "",
      socialHistory: "",
      primaryDiagnosis: "",
      secondaryDiagnoses: [],
      treatmentPlan: "",
      goals: [],
      contraindications: [],
      recommendations: "",
    },
  });

  const painScale = watch("painScale");

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const examinationData = {
        patient: patientId,
        subjectiveAssessment: {
          chiefComplaint: data.chiefComplaint,
          painScale: parseInt(data.painScale),
          historyOfPresentIllness: data.historyOfPresentIllness,
          pastMedicalHistory: data.pastMedicalHistory,
          socialHistory: data.socialHistory,
        },
        objectiveAssessment: {
          observation: data.observation || "",
          palpation: data.palpation || "",
          rangeOfMotion: data.rangeOfMotion || "",
          muscleStrength: data.muscleStrength || "",
          functionalTests: data.functionalTests || "",
          specialTests: data.specialTests || "",
          neurological: data.neurological || "",
        },
        assessment: {
          primaryDiagnosis: data.primaryDiagnosis,
          secondaryDiagnoses: data.secondaryDiagnoses || [],
          prognosisAssessment: data.prognosisAssessment || "",
        },
        plan: {
          treatmentPlan: data.treatmentPlan,
          goals: {
            shortTerm: data.shortTermGoals
              ? data.shortTermGoals.split("\n")
              : [],
            longTerm: data.longTermGoals ? data.longTermGoals.split("\n") : [],
          },
          contraindications: data.contraindications
            ? data.contraindications.split("\n")
            : [],
          recommendations: data.recommendations,
        },
      };

      if (mode === "create") {
        await examinationService.create(examinationData);
        toast.success("Badanie zostało zapisane");
      } else {
        await examinationService.update(examination._id, examinationData);
        toast.success("Badanie zostało zaktualizowane");
      }
    } catch (error) {
      toast.error("Błąd podczas zapisywania badania");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Ocena subiektywna */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Ocena subiektywna</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Główna dolegliwość
              </label>
              <textarea
                {...register("chiefComplaint", {
                  required: "To pole jest wymagane",
                })}
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Opisz główną dolegliwość pacjenta..."
              />
              {errors.chiefComplaint && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.chiefComplaint.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Skala bólu (0-10): {painScale}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                {...register("painScale")}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Brak bólu</span>
                <span>Najsilniejszy ból</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Historia obecnej choroby
              </label>
              <textarea
                {...register("historyOfPresentIllness")}
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={4}
                placeholder="Opis rozwoju dolegliwości..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Historia chorób
              </label>
              <textarea
                {...register("pastMedicalHistory")}
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Wcześniejsze choroby, operacje, urazy..."
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Ocena obiektywna */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Ocena obiektywna</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Obserwacja
              </label>
              <textarea
                {...register("observation")}
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Postawa, chód, asymetrie..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Palpacja</label>
              <textarea
                {...register("palpation")}
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Napięcie mięśni, punkty bolesnee..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Zakres ruchu
              </label>
              <textarea
                {...register("rangeOfMotion")}
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Pomiary goniometryczne..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Siła mięśniowa
              </label>
              <textarea
                {...register("muscleStrength")}
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Ocena w skali Lovetta..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Testy funkcjonalne
              </label>
              <textarea
                {...register("functionalTests")}
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Testy sprawności, równowagi..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Testy specjalne
              </label>
              <textarea
                {...register("specialTests")}
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Testy prowokacyjne, ortopedyczne..."
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Diagnoza */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Diagnoza i plan</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Diagnoza główna
              </label>
              <Input
                {...register("primaryDiagnosis", {
                  required: "Diagnoza główna jest wymagana",
                })}
                placeholder="Główna diagnoza fizjoterapeutyczna"
                error={errors.primaryDiagnosis?.message}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Plan terapii
              </label>
              <textarea
                {...register("treatmentPlan")}
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={4}
                placeholder="Szczegółowy plan terapii..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Cele krótkoterminowe
                </label>
                <textarea
                  {...register("shortTermGoals")}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={4}
                  placeholder="Jeden cel w linii..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Cele długoterminowe
                </label>
                <textarea
                  {...register("longTermGoals")}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={4}
                  placeholder="Jeden cel w linii..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Przeciwwskazania
              </label>
              <textarea
                {...register("contraindications")}
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Jedno przeciwwskazanie w linii..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Zalecenia
              </label>
              <textarea
                {...register("recommendations")}
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Zalecenia dla pacjenta..."
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="flex gap-4">
        <Button type="button" variant="secondary" disabled={isSubmitting}>
          Anuluj
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Zapisywanie..." : "Zapisz badanie"}
        </Button>
      </div>
    </form>
  );
}
