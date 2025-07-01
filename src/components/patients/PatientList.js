"use client";
import { useState, useEffect } from "react";
import { useApp } from "@/context/AuthContext";
import { patientService } from "@/lib/services/patientService";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Spinner from "@/components/ui/Spinner";

export default function PatientList() {
  const { state, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    loadPatients();
  }, []);

  useEffect(() => {
    const filtered = state.patients.filter(
      (patient) =>
        patient.personalInfo.firstName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        patient.personalInfo.lastName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        patient.personalInfo.contact.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [searchTerm, state.patients]);

  const loadPatients = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const patients = await patientService.getAll();
      dispatch({ type: "SET_PATIENTS", payload: patients });
    } catch (error) {
      console.error("Error loading patients:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  if (state.isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Pacjenci</h2>
        <Button href="/dashboard/patients/new" variant="primary">
          Dodaj Pacjenta
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Szukaj pacjentów..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredPatients.map((patient) => (
          <Card key={patient._id} className="hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {patient.personalInfo.firstName}{" "}
                  {patient.personalInfo.lastName}
                </h3>
                <p className="text-sm text-gray-600">
                  {patient.personalInfo.contact.email} •{" "}
                  {patient.personalInfo.contact.phone}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="info">
                    {new Date().getFullYear() -
                      new Date(
                        patient.personalInfo.dateOfBirth
                      ).getFullYear()}{" "}
                    lat
                  </Badge>
                  {patient.medicalInfo.allergies.length > 0 && (
                    <Badge variant="warning">Alergie</Badge>
                  )}
                  {patient.medicalInfo.chronicConditions.length > 0 && (
                    <Badge variant="danger">Choroby przewlekłe</Badge>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  href={`/dashboard/patients/${patient._id}`}
                >
                  Szczegóły
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  href={`/dashboard/appointments/new?patientId=${patient._id}`}
                >
                  Umów wizytę
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && !state.isLoading && (
        <Card className="text-center py-12">
          <p className="text-gray-500">
            {searchTerm
              ? "Nie znaleziono pacjentów spełniających kryteria wyszukiwania."
              : "Brak pacjentów w systemie."}
          </p>
        </Card>
      )}
    </div>
  );
}
