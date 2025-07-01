// src/lib/services/documentService.js
import { apiClient } from "@/lib/api/client";

export const documentService = {
  /* CRUD ------------------------------------------------------------------ */
  async getAll(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return apiClient.get(`/api/documents${qs ? `?${qs}` : ""}`);
  },
  getById: (id) => apiClient.get(`/api/documents/${id}`),
  getByPatient: (pId) => apiClient.get(`/api/documents?patient=${pId}`),
  create: (d) => apiClient.post("/api/documents", d),
  update: (id, d) => apiClient.put(`/api/documents/${id}`, d),
  delete: (id) => apiClient.delete(`/api/documents/${id}`),

  /* Generowanie i obsługa PDF -------------------------------------------- */
  async generatePDF(id, opts = {}) {
    const res = await fetch(`${apiClient.baseURL}/api/documents/${id}/pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          apiClient.token || localStorage.getItem("token")
        }`,
      },
      body: JSON.stringify(opts),
    });
    if (!res.ok) throw new Error("Błąd podczas generowania PDF");
    return res.blob(); // <- zwraca Blob
  },

  async downloadPDF(id, fname = `document-${id}.pdf`) {
    const blob = await this.generatePDF(id);
    const url = window.URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {
      href: url,
      download: fname,
    });
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  },

  previewPDF: async function (id) {
    const blob = await this.generatePDF(id);
    window.open(window.URL.createObjectURL(blob), "_blank");
  },

  /* Szablony i podpis elektroniczny -------------------------------------- */
  getTemplates: () => apiClient.get("/api/documents/templates"),
  createFromTemplate: (tId, data) =>
    apiClient.post(`/api/documents/templates/${tId}/generate`, data),

  signDocument: (id, sig) => apiClient.post(`/api/documents/${id}/sign`, sig),
  getSignatureStatus: (id) =>
    apiClient.get(`/api/documents/${id}/signature-status`),

  /* Udostępnianie pacjentom ---------------------------------------------- */
  shareWithPatient: (id, pId, o) =>
    apiClient.post(`/api/documents/${id}/share`, { patientId: pId, ...o }),
  getSharedDocuments: (pId) =>
    apiClient.get(`/api/documents/shared?patient=${pId}`),
};
