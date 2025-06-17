import { ROLES } from "./constants";

export function canEditPatient(user) {
  return [ROLES.ADMIN, ROLES.PHYSIOTHERAPIST].includes(user.role);
}

export function canViewReports(user) {
  return user.role === ROLES.ADMIN;
}
