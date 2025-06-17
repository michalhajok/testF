// hooks/useAppointmentScheduler.js
import { useState, useEffect } from "react";
import { format, addDays, startOfWeek } from "date-fns";

export const useAppointmentScheduler = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);

  const generateTimeSlots = (date) => {
    const slots = [];
    for (let hour = 8; hour < 18; hour++) {
      slots.push({
        time: format(date.setHours(hour), "HH:mm"),
        available: Math.random() > 0.5,
      });
    }
    return slots;
  };

  useEffect(() => {
    const weekDays = Array.from({ length: 7 }, (_, i) =>
      addDays(startOfWeek(currentWeek), i)
    );

    setTimeSlots(
      weekDays.map((date) => ({
        date,
        slots: generateTimeSlots(new Date(date)),
      }))
    );
  }, [currentWeek]);

  return { timeSlots, currentWeek, setCurrentWeek };
};
