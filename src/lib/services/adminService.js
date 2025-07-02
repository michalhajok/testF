// src/lib/services/adminService.js
import { apiClient } from "@/lib/api/client";

export const adminService = {
  /* Metryki & raporty ----------------------------------------------------- */
  getDashboardStats: () => apiClient.backendGet("/api/admin/dashboard-stats"),
  getSystemMetrics: () => apiClient.backendGet("/api/admin/system-metrics"),
  getFinancialReport: (s, e) =>
    apiClient.backendGet(`/api/admin/financial-report?start=${s}&end=${e}`),
  getPatientStats: (p = "month") =>
    apiClient.backendGet(`/api/admin/patient-stats?period=${p}`),
  getEmployeeStats: () => apiClient.backendGet("/api/admin/employee-stats"),
  getVisitStats: (p = "month") =>
    apiClient.backendGet(`/api/admin/visit-stats?period=${p}`),

  /* Ustawienia i konfiguracja -------------------------------------------- */
  getSystemSettings: () => apiClient.backendGet("/api/admin/settings"),
  updateSystemSettings: (s) => apiClient.put("/api/admin/settings", s),

  getFacilitySettings: () => apiClient.backendGet("/api/admin/facility"),
  updateFacilitySettings: (s) => apiClient.put("/api/admin/facility", s),

  getServicePricing: () => apiClient.backendGet("/api/admin/services/pricing"),
  updateServicePricing: (d) => apiClient.put("/api/admin/services/pricing", d),

  /* Użytkownicy & role ---------------------------------------------------- */
  getAllUsers: (p = {}) =>
    apiClient.backendGet(`/api/admin/users?${new URLSearchParams(p)}`),
  updateUserRole: (id, r) =>
    apiClient.patch(`/api/admin/users/${id}/role`, { role: r }),
  updateUserPermissions: (id, perm) =>
    apiClient.patch(`/api/admin/users/${id}/permissions`, {
      permissions: perm,
    }),
  deactivateUser: (id) => apiClient.patch(`/api/admin/users/${id}/deactivate`),
  activateUser: (id) => apiClient.patch(`/api/admin/users/${id}/activate`),

  /* Kopie zapasowe / eksport --------------------------------------------- */
  backupDatabase: () => apiClient.post("/api/admin/backup"),
  getBackupHistory: () => apiClient.backendGet("/api/admin/backups"),
  exportData: async (type, o = {}) => {
    const res = await fetch(`${apiClient.baseURL}/api/admin/export/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          apiClient.token || localStorage.getItem("token")
        }`,
      },
      body: JSON.stringify(o),
    });
    if (!res.ok) throw new Error("Błąd podczas eksportu danych");
    return res.blob();
  },

  /* Audyt i logi ---------------------------------------------------------- */
  getAuditLogs: (p = {}) =>
    apiClient.get(`/api/admin/audit-logs?${new URLSearchParams(p)}`),

  /* Powiadomienia systemowe ---------------------------------------------- */
  sendSystemNotification: (d) =>
    apiClient.post("/api/admin/notifications/send", d),
  getNotificationTemplates: () =>
    apiClient.get("/api/admin/notifications/templates"),
  updateNotificationTemplate: (id, d) =>
    apiClient.put(`/api/admin/notifications/templates/${id}`, d),
};
