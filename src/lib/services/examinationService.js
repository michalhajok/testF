// src/lib/services/examinationService.js
export const examinationService = {
  async getAll(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return await apiClient.get(
      `/api/examinations${queryString ? `?${queryString}` : ""}`
    );
  },

  async getById(id) {
    return await apiClient.get(`/api/examinations/${id}`);
  },

  async create(data) {
    return await apiClient.post("/api/examinations", data);
  },

  async update(id, data) {
    return await apiClient.put(`/api/examinations/${id}`, data);
  },

  async getByPatient(patientId) {
    return await apiClient.get(`/api/examinations?patient=${patientId}`);
  },
};
