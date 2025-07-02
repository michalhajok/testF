// src/app/dashboard/layout.js
"use client";

import Sidebar from "@/components/layout/Sidebar";
import { useApp } from "@/context/AuthContext";
import "../globals.css";

export default function DashboardLayout({ children }) {
  const { state } = useApp();
  const userRole = state.user?.role || "patient";

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role={userRole} />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-xl font-medium text-gray-800">Dashboard</h1>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
