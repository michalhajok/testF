import { apiClient } from "@/lib/api/client";
import { format } from "date-fns";

export const appointmentService = {
  async getAll(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/api/appointments${queryString ? `?${queryString}` : ""}`;
    return await apiClient.get(endpoint);
  },

  async getById(id) {
    return await apiClient.get(`/api/appointments/${id}`);
  },

  async getByDateRange(startDate, endDate) {
    const params = {
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
    };
    return await this.getAll(params);
  },

  async create(appointmentData) {
    return await apiClient.post("/api/appointments", appointmentData);
  },

  async update(id, appointmentData) {
    return await apiClient.put(`/api/appointments/${id}`, appointmentData);
  },

  async delete(id) {
    return await apiClient.delete(`/api/appointments/${id}`);
  },

  async confirm(id) {
    return await apiClient.patch(`/api/appointments/${id}/confirm`);
  },

  async cancel(id, reason) {
    return await apiClient.patch(`/api/appointments/${id}/cancel`, { reason });
  },

  async complete(id) {
    return await apiClient.patch(`/api/appointments/${id}/complete`);
  },

  async getAvailableSlots(employeeId, date) {
    return await apiClient.get(
      `/api/appointments/available-slots?employeeId=${employeeId}&date=${date}`
    );
  },
};
