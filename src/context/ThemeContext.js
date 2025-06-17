"use client";
import { createContext, useContext, useState } from "react";

export const themes = {
  light: { foreground: "#000", background: "#fff" },
  dark: { foreground: "#fff", background: "#222" },
};

const ThemeContext = createContext({
  theme: themes.light,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () =>
    setTheme(theme === themes.dark ? themes.light : themes.dark);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
