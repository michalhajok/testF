// src/lib/api/client.js
import { toast } from "react-hot-toast";

class ApiClient {
  constructor() {
    // Dla komunikacji z backendem
    this.backendURL = process.env.BACKEND_URL || "http://localhost:3001";
    // Dla wewnętrznych API routes Next.js
    this.apiURL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
    this.token = null;
  }

  setToken(token) {
    this.token = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  }

  async request(endpoint, options = {}, useBackend = false) {
    const baseURL = useBackend ? this.backendURL : this.apiURL;
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

  // Metody dla Next.js API routes (localhost:3000)
  get(endpoint) {
    return this.request(endpoint, { method: "GET" });
  }
  post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Metody dla komunikacji z backendem (localhost:3001)
  backendGet(endpoint) {
    return this.request(endpoint, { method: "GET" }, true);
  }
  backendPost(endpoint, data) {
    return this.request(
      endpoint,
      { method: "POST", body: JSON.stringify(data) },
      true
    );
  }
}

export const apiClient = new ApiClient();
