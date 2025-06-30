import { apiClient } from "@/lib/api/client";

export const patientService = {
  async getAll(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/api/patients${queryString ? `?${queryString}` : ""}`;
    return await apiClient.get(endpoint);
  },

  async getById(id) {
    return await apiClient.get(`/api/patients/${id}`);
  },

  async create(patientData) {
    return await apiClient.post("/api/patients", patientData);
  },

  async update(id, patientData) {
    return await apiClient.put(`/api/patients/${id}`, patientData);
  },

  async delete(id) {
    return await apiClient.delete(`/api/patients/${id}`);
  },

  async search(query) {
    return await apiClient.get(
      `/api/patients/search?q=${encodeURIComponent(query)}`
    );
  },

  async getVisitHistory(patientId) {
    return await apiClient.get(`/api/patients/${patientId}/visits`);
  },

  async getExaminations(patientId) {
    return await apiClient.get(`/api/patients/${patientId}/examinations`);
  },
};
