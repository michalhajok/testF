"use client";
import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();
const NotificationUpdateContext = createContext();

export function useNotification() {
  return useContext(NotificationContext);
}
export function useNotificationUpdate() {
  return useContext(NotificationUpdateContext);
}

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  const showNotification = (data) => setNotification(data);
  const clearNotification = () => setNotification(null);

  return (
    <NotificationContext.Provider value={{ notification, clearNotification }}>
      <NotificationUpdateContext.Provider value={showNotification}>
        {children}
      </NotificationUpdateContext.Provider>
    </NotificationContext.Provider>
  );
}
