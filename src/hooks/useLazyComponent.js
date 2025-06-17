// hooks/useLazyComponent.js
import { useState, useEffect } from "react";

export const useLazyComponent = (importFn) => {
  const [component, setComponent] = useState(null);

  useEffect(() => {
    importFn().then((module) => {
      setComponent(() => module.default);
    });
  }, [importFn]);

  return component;
};
