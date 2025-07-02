// src/app/layout.js
import "./globals.css";
import { AppProvider } from "@/context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
