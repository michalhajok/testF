// src/lib/api.js - Integracja z API backendu fizjoterapeutycznego

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
}

// Authentication API calls
export const authAPI = {
  login: async (credentials) => {
    return apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  logout: async () => {
    return apiCall("/auth/logout", {
      method: "POST",
    });
  },

  refreshToken: async () => {
    return apiCall("/auth/refresh", {
      method: "POST",
    });
  },

  getCurrentUser: async () => {
    return apiCall("/auth/me");
  },
};

// Patients API calls
export const patientsAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/patients?${queryString}`);
  },

  getById: async (id) => {
    return apiCall(`/patients/${id}`);
  },

  create: async (patientData) => {
    return apiCall("/patients", {
      method: "POST",
      body: JSON.stringify(patientData),
    });
  },

  update: async (id, patientData) => {
    return apiCall(`/patients/${id}`, {
      method: "PUT",
      body: JSON.stringify(patientData),
    });
  },

  delete: async (id) => {
    return apiCall(`/patients/${id}`, {
      method: "DELETE",
    });
  },

  getMedicalHistory: async (id) => {
    return apiCall(`/patients/${id}/medical-history`);
  },
};

// Employees API calls
export const employeesAPI = {
  getAll: async () => {
    return apiCall("/employees");
  },

  getById: async (id) => {
    return apiCall(`/employees/${id}`);
  },

  create: async (employeeData) => {
    return apiCall("/employees", {
      method: "POST",
      body: JSON.stringify(employeeData),
    });
  },

  update: async (id, employeeData) => {
    return apiCall(`/employees/${id}`, {
      method: "PUT",
      body: JSON.stringify(employeeData),
    });
  },

  getSchedule: async (id, date) => {
    return apiCall(`/employees/${id}/schedule?date=${date}`);
  },
};

// Appointments API calls
export const appointmentsAPI = {
  getAll: async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    return apiCall(`/appointments?${queryString}`);
  },

  getById: async (id) => {
    return apiCall(`/appointments/${id}`);
  },

  create: async (appointmentData) => {
    return apiCall("/appointments", {
      method: "POST",
      body: JSON.stringify(appointmentData),
    });
  },

  update: async (id, appointmentData) => {
    return apiCall(`/appointments/${id}`, {
      method: "PUT",
      body: JSON.stringify(appointmentData),
    });
  },

  cancel: async (id, reason) => {
    return apiCall(`/appointments/${id}/cancel`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    });
  },

  getAvailableSlots: async (physiotherapistId, date) => {
    return apiCall(
      `/appointments/available-slots?physiotherapistId=${physiotherapistId}&date=${date}`
    );
  },
};

// Examinations API calls
export const examinationsAPI = {
  getAll: async (patientId) => {
    return apiCall(`/examinations?patientId=${patientId}`);
  },

  getById: async (id) => {
    return apiCall(`/examinations/${id}`);
  },

  create: async (examinationData) => {
    return apiCall("/examinations", {
      method: "POST",
      body: JSON.stringify(examinationData),
    });
  },

  update: async (id, examinationData) => {
    return apiCall(`/examinations/${id}`, {
      method: "PUT",
      body: JSON.stringify(examinationData),
    });
  },

  addNote: async (id, note) => {
    return apiCall(`/examinations/${id}/notes`, {
      method: "POST",
      body: JSON.stringify({ note }),
    });
  },
};

// Visits API calls
export const visitsAPI = {
  getAll: async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    return apiCall(`/visits?${queryString}`);
  },

  getById: async (id) => {
    return apiCall(`/visits/${id}`);
  },

  create: async (visitData) => {
    return apiCall("/visits", {
      method: "POST",
      body: JSON.stringify(visitData),
    });
  },

  complete: async (id, visitSummary) => {
    return apiCall(`/visits/${id}/complete`, {
      method: "POST",
      body: JSON.stringify(visitSummary),
    });
  },
};

// Documents API calls
export const documentsAPI = {
  getAll: async (patientId) => {
    return apiCall(`/documents?patientId=${patientId}`);
  },

  upload: async (file, patientId, type) => {
    const formData = new FormData();
    formData.append("document", file);
    formData.append("patientId", patientId);
    formData.append("type", type);

    return apiCall("/documents/upload", {
      method: "POST",
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it with boundary
    });
  },

  download: async (id) => {
    return apiCall(`/documents/${id}/download`);
  },

  delete: async (id) => {
    return apiCall(`/documents/${id}`, {
      method: "DELETE",
    });
  },
};

// Reports API calls
export const reportsAPI = {
  getStatistics: async (period = "30d") => {
    return apiCall(`/reports/statistics?period=${period}`);
  },

  getFinancial: async (startDate, endDate) => {
    return apiCall(
      `/reports/financial?startDate=${startDate}&endDate=${endDate}`
    );
  },

  getPatientStats: async (patientId) => {
    return apiCall(`/reports/patient-stats/${patientId}`);
  },

  export: async (type, filters = {}) => {
    const queryString = new URLSearchParams({ type, ...filters }).toString();
    return apiCall(`/reports/export?${queryString}`);
  },
};

// Services API calls
export const servicesAPI = {
  getAll: async () => {
    return apiCall("/services");
  },

  getById: async (id) => {
    return apiCall(`/services/${id}`);
  },

  create: async (serviceData) => {
    return apiCall("/services", {
      method: "POST",
      body: JSON.stringify(serviceData),
    });
  },

  update: async (id, serviceData) => {
    return apiCall(`/services/${id}`, {
      method: "PUT",
      body: JSON.stringify(serviceData),
    });
  },
};

// Settings API calls
export const settingsAPI = {
  get: async () => {
    return apiCall("/settings");
  },

  update: async (settings) => {
    return apiCall("/settings", {
      method: "PUT",
      body: JSON.stringify(settings),
    });
  },

  getNotificationSettings: async () => {
    return apiCall("/settings/notifications");
  },

  updateNotificationSettings: async (settings) => {
    return apiCall("/settings/notifications", {
      method: "PUT",
      body: JSON.stringify(settings),
    });
  },
};

// Schedules API calls
export const schedulesAPI = {
  getAll: async (employeeId, startDate, endDate) => {
    return apiCall(
      `/schedules?employeeId=${employeeId}&startDate=${startDate}&endDate=${endDate}`
    );
  },

  create: async (scheduleData) => {
    return apiCall("/schedules", {
      method: "POST",
      body: JSON.stringify(scheduleData),
    });
  },

  update: async (id, scheduleData) => {
    return apiCall(`/schedules/${id}`, {
      method: "PUT",
      body: JSON.stringify(scheduleData),
    });
  },

  delete: async (id) => {
    return apiCall(`/schedules/${id}`, {
      method: "DELETE",
    });
  },
};

export default {
  auth: authAPI,
  patients: patientsAPI,
  employees: employeesAPI,
  appointments: appointmentsAPI,
  examinations: examinationsAPI,
  visits: visitsAPI,
  documents: documentsAPI,
  reports: reportsAPI,
  services: servicesAPI,
  settings: settingsAPI,
  schedules: schedulesAPI,
};
