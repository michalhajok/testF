import { toast } from "react-hot-toast";

class ApiClient {
  constructor() {
    this.backendURL = process.env.BACKEND_URL || "http://localhost:3001";
    this.token = null;
  }

  setToken(token) {
    this.token = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  }

  async request(baseURL, endpoint, options = {}) {
    const url = `${baseURL}${endpoint}`;
    const token =
      this.token ||
      (typeof window !== "undefined" ? localStorage.getItem("token") : null);

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Network error" }));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }

  // Direct backend methods
  backendGet(endpoint) {
    return this.request(this.backendURL, endpoint, { method: "GET" });
  }
  backendPost(endpoint, data) {
    return this.request(this.backendURL, endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  backendPut(endpoint, data) {
    return this.request(this.backendURL, endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }
  backendPatch(endpoint, data) {
    return this.request(this.backendURL, endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }
  backendDelete(endpoint) {
    return this.request(this.backendURL, endpoint, { method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
