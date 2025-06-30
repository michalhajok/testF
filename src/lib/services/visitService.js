// src/lib/services/visitService.js
export const visitService = {
  async getAll(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return await apiClient.get(
      `/api/visits${queryString ? `?${queryString}` : ""}`
    );
  },

  async getById(id) {
    return await apiClient.get(`/api/visits/${id}`);
  },

  async create(data) {
    return await apiClient.post("/api/visits", data);
  },

  async complete(id, completionData) {
    return await apiClient.patch(`/api/visits/${id}/complete`, completionData);
  },

  async getByPatient(patientId) {
    return await apiClient.get(`/api/patients/${patientId}/visits`);
  },
};
