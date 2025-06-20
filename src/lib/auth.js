import { jwtDecode } from "jwt-decode";

export function login({ email, password }) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function logout() {
  localStorage.removeItem("authToken");
}

export function getUserFromToken(token) {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export function hasRole(user, role) {
  return user?.role === role;
}

export function verifyJWT(token) {
  try {
    const decoded = jwtDecode(token);
    // Sprawdź czy token nie wygasł
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}
