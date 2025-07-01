import { apiClient } from "@/lib/api/client";
import { format } from "date-fns";

export const appointmentService = {
  getAll(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return apiClient.backendGet(`/api/appointments${qs ? `?${qs}` : ""}`);
  },

  getById(id) {
    return apiClient.backendGet(`/api/appointments/${id}`);
  },

  getByDateRange(startDate, endDate) {
    const qs = `?startDate=${format(startDate, "yyyy-MM-dd")}&endDate=${format(
      endDate,
      "yyyy-MM-dd"
    )}`;
    return apiClient.backendGet(`/api/appointments${qs}`);
  },

  create(appointmentData) {
    return apiClient.backendPost("/api/appointments", appointmentData);
  },

  update(id, appointmentData) {
    return apiClient.backendPut(`/api/appointments/${id}`, appointmentData);
  },

  delete(id) {
    return apiClient.backendDelete(`/api/appointments/${id}`);
  },

  confirm(id) {
    return apiClient.backendPatch(`/api/appointments/${id}/confirm`);
  },

  cancel(id, reason) {
    return apiClient.backendPatch(`/api/appointments/${id}/cancel`, { reason });
  },

  complete(id) {
    return apiClient.backendPatch(`/api/appointments/${id}/complete`);
  },

  getAvailableSlots(employeeId, date) {
    return apiClient.backendGet(
      `/api/appointments/available-slots?employeeId=${employeeId}&date=${date}`
    );
  },
};
