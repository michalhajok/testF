// hooks/useAccessibility.js
import { useEffect } from "react";

export const useAccessibility = () => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Tab") {
        document.documentElement.classList.add("keyboard-focus");
      }
    };

    const handleMouseDown = () => {
      document.documentElement.classList.remove("keyboard-focus");
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);
};
