// src/hooks/usePermissions.js
"use client";
import { useApp } from "@/context/AppContext";

export const usePermissions = () => {
  const { state } = useApp();
  const user = state.user;

  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };

  const hasRole = (role) => {
    if (!user || !user.roles) return false;
    return user.roles.includes(role);
  };

  const canAccess = (resource, action) => {
    return hasPermission(`${resource}:${action}`);
  };

  return { hasPermission, hasRole, canAccess, user };
};
