// hooks/usePatientManagement.js
import { useApi } from "./useApi";

export const usePatientManagement = () => {
  const { data: patients, error, loading, refetch } = useApi("/patients");

  const createPatient = async (patientData) => {
    await fetch("/api/patients", {
      method: "POST",
      body: JSON.stringify(patientData),
    });
    refetch();
  };

  return { patients, loading, error, createPatient };
};
