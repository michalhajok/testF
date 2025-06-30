"use client";
import { createContext, useContext, useReducer, useEffect } from "react";
import { apiClient } from "@/lib/api/client";

const AppContext = createContext();

const initialState = {
  user: null,
  isLoading: false,
  patients: [],
  appointments: [],
  visits: [],
  examinations: [],
  notifications: [],
};

function appReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_PATIENTS":
      return { ...state, patients: action.payload };
    case "ADD_PATIENT":
      return { ...state, patients: [...state.patients, action.payload] };
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: state.patients.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
      };
    case "SET_APPOINTMENTS":
      return { ...state, appointments: action.payload };
    case "ADD_APPOINTMENT":
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      apiClient.setToken(token);
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};
