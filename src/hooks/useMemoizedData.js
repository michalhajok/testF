// hooks/useMemoizedData.js
import { useMemo } from "react";

export const useMemoizedData = (data, keyExtractor) => {
  return useMemo(
    () =>
      data.map((item) => ({
        ...item,
        key: keyExtractor(item),
      })),
    [data, keyExtractor]
  );
};
