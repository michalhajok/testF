export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePesel(pesel) {
  return /^\d{11}$/.test(pesel);
}

export function validateRequired(value) {
  return value !== undefined && value !== null && value !== "";
}
