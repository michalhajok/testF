import { apiClient } from "@/lib/api/client";

export const patientService = {
  getAll(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return apiClient.backendGet(`/api/patients${qs ? `?${qs}` : ""}`);
  },

  getById(id) {
    return apiClient.backendGet(`/api/patients/${id}`);
  },

  create(patientData) {
    return apiClient.backendPost("/api/patients", patientData);
  },

  update(id, patientData) {
    return apiClient.backendPut(`/api/patients/${id}`, patientData);
  },

  delete(id) {
    return apiClient.backendDelete(`/api/patients/${id}`);
  },

  search(query) {
    return apiClient.backendGet(
      `/api/patients/search?q=${encodeURIComponent(query)}`
    );
  },

  getVisitHistory(patientId) {
    return apiClient.backendGet(`/api/patients/${patientId}/visits`);
  },

  getExaminations(patientId) {
    return apiClient.backendGet(`/api/patients/${patientId}/examinations`);
  },
};
