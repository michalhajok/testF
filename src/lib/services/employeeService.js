// src/lib/services/employeeService.js
import { apiClient } from "@/lib/api/client";

export const employeeService = {
  /* CRUD ------------------------------------------------------------------ */
  async getAll(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return apiClient.get(`/api/employees${qs ? `?${qs}` : ""}`);
  },
  getById: (id) => apiClient.get(`/api/employees/${id}`),
  create: (data) => apiClient.post("/api/employees", data),
  update: (id, d) => apiClient.put(`/api/employees/${id}`, d),
  delete: (id) => apiClient.delete(`/api/employees/${id}`),

  /* Filtry i role --------------------------------------------------------- */
  getByRole: (r) => apiClient.get(`/api/employees?role=${r}`),
  getPhysiotherapists: function () {
    return this.getByRole("physiotherapist");
  },

  /* Status, uprawnienia, harmonogram ------------------------------------- */
  updateStatus: (id, s) =>
    apiClient.patch(`/api/employees/${id}/status`, { status: s }),
  resetPassword: (id) => apiClient.post(`/api/employees/${id}/reset-password`),

  getSchedule: (id, d) =>
    apiClient.get(`/api/employees/${id}/schedule?date=${d}`),
  updateSchedule: (id, d) => apiClient.put(`/api/employees/${id}/schedule`, d),

  /* Analizy obciążenia ---------------------------------------------------- */
  getWorkload: (id, st, end) =>
    apiClient.get(`/api/employees/${id}/workload?start=${st}&end=${end}`),
  getAvailability: (id, d) =>
    apiClient.get(`/api/employees/${id}/availability?date=${d}`),
};
