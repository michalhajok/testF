import { apiClient } from "@/lib/api/client";

export const employeeService = {
  getAll(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return apiClient.backendGet(`/api/employees${qs ? `?${qs}` : ""}`);
  },

  getById(id) {
    return apiClient.backendGet(`/api/employees/${id}`);
  },

  create(data) {
    return apiClient.backendPost("/api/employees", data);
  },

  update(id, data) {
    return apiClient.backendPut(`/api/employees/${id}`, data);
  },

  delete(id) {
    return apiClient.backendDelete(`/api/employees/${id}`);
  },

  getByRole(role) {
    return apiClient.backendGet(`/api/employees?role=${role}`);
  },

  getPhysiotherapists() {
    return this.getByRole("physiotherapist");
  },

  updateStatus(id, status) {
    return apiClient.backendPatch(`/api/employees/${id}/status`, { status });
  },

  resetPassword(id) {
    return apiClient.backendPost(`/api/employees/${id}/reset-password`);
  },

  getSchedule(id, date) {
    return apiClient.backendGet(`/api/employees/${id}/schedule?date=${date}`);
  },

  updateSchedule(id, scheduleData) {
    return apiClient.backendPut(`/api/employees/${id}/schedule`, scheduleData);
  },

  getWorkload(id, start, end) {
    return apiClient.backendGet(
      `/api/employees/${id}/workload?start=${start}&end=${end}`
    );
  },

  getAvailability(id, date) {
    return apiClient.backendGet(
      `/api/employees/${id}/availability?date=${date}`
    );
  },
};
