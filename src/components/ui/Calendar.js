// src/components/ui/Calendar.js
"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { forwardRef } from "react";

const Calendar = forwardRef(function Calendar(
  { selected, onSelect, locale, className },
  ref
) {
  return (
    <DayPicker
      ref={ref}
      mode="single"
      selected={selected}
      onSelect={onSelect}
      locale={locale}
      className={className}
      styles={{
        caption: { textAlign: "center", fontWeight: "500" },
        head_row: { display: "flex", justifyContent: "space-between" },
        head_cell: { width: "2rem", textAlign: "center", fontWeight: "600" },
        day: { width: "2rem", height: "2rem" },
        day_selected: {
          backgroundColor: "var(--medical-primary)",
          color: "white",
        },
        day_today: {
          fontWeight: "600",
          color: "var(--medical-secondary)",
        },
        day_outside: { color: "#aaa" },
      }}
    />
  );
});

export default Calendar;
