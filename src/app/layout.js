// src/app/layout.js
import { AppProvider } from "@/context/AppContext";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
