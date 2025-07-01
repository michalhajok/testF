import { apiClient } from "@/lib/api/client";

export const documentService = {
  getAll(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return apiClient.backendGet(`/api/documents${qs ? `?${qs}` : ""}`);
  },

  getById(id) {
    return apiClient.backendGet(`/api/documents/${id}`);
  },

  getByPatient(pId) {
    return apiClient.backendGet(`/api/documents?patient=${pId}`);
  },

  create(data) {
    return apiClient.backendPost("/api/documents", data);
  },

  update(id, data) {
    return apiClient.backendPut(`/api/documents/${id}`, data);
  },

  delete(id) {
    return apiClient.backendDelete(`/api/documents/${id}`);
  },

  generatePDF(id, opts = {}) {
    return apiClient.backendPost(`/api/documents/${id}/pdf`, opts);
  },

  downloadPDF(id, fname = `document-${id}.pdf`) {
    return this.generatePDF(id).then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = Object.assign(document.createElement("a"), {
        href: url,
        download: fname,
      });
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    });
  },

  previewPDF(id) {
    return this.generatePDF(id).then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      window.open(url, "_blank");
    });
  },

  getTemplates() {
    return apiClient.backendGet("/api/documents/templates");
  },

  createFromTemplate(tId, data) {
    return apiClient.backendPost(
      `/api/documents/templates/${tId}/generate`,
      data
    );
  },

  signDocument(id, sig) {
    return apiClient.backendPost(`/api/documents/${id}/sign`, sig);
  },

  getSignatureStatus(id) {
    return apiClient.backendGet(`/api/documents/${id}/signature-status`);
  },

  shareWithPatient(id, pId, o) {
    return apiClient.backendPost(`/api/documents/${id}/share`, {
      patientId: pId,
      ...o,
    });
  },

  getSharedDocuments(pId) {
    return apiClient.backendGet(`/api/documents/shared?patient=${pId}`);
  },
};
