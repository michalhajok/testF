// hooks/useApi.js
import { useState, useEffect } from "react";

export const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [abortController, setAbortController] = useState(new AbortController());

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        ...options,
        signal: abortController.signal,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) throw new Error(response.statusText);

      const result = await response.json();
      setData(result);
    } catch (err) {
      if (err.name !== "AbortError") setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    return () => abortController.abort();
  }, [url]);

  return { data, error, loading, refetch: fetchData };
};
