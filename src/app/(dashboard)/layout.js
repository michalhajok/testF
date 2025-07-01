"use client";

import Sidebar from "@/components/layout/Sidebar";
import { AppProvider } from "@/context/AuthContext";
import "../globals.css";

export default function DashboardLayout({ children }) {
  return (
    <AppProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar className="w-64 hidden md:block" />
        <div className="flex-1 flex flex-col">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4">
              {/* Tutaj można dodać Breadcrumbs lub pasek nagłówka */}
              <h1 className="text-xl font-medium text-gray-800">Dashboard</h1>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto px-4 py-6">{children}</div>
          </main>
        </div>
      </div>
    </AppProvider>
  );
}
