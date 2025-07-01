"use client";
import { useState, useEffect } from "react";
import Calendar from "@/components/ui/Calendar";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { appointmentService } from "@/lib/services/appointmentService";
import { format, startOfDay, endOfDay } from "date-fns";
import { pl } from "date-fns/locale";

export default function AppointmentCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [dayAppointments, setDayAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadAppointments();
  }, [selectedDate]);

  const loadAppointments = async () => {
    try {
      setIsLoading(true);
      const data = await appointmentService.getByDateRange(
        startOfDay(selectedDate),
        endOfDay(selectedDate)
      );
      setDayAppointments(data);
    } catch (error) {
      console.error("Error loading appointments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "scheduled":
        return "info";
      case "confirmed":
        return "success";
      case "completed":
        return "secondary";
      case "cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "scheduled":
        return "Zaplanowana";
      case "confirmed":
        return "Potwierdzona";
      case "completed":
        return "Zakończona";
      case "cancelled":
        return "Anulowana";
      default:
        return status;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Kalendarz</h3>
            <Calendar
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={pl}
              className="w-full"
            />
            <div className="mt-4">
              <Button
                variant="primary"
                className="w-full"
                href={`/dashboard/appointments/new?date=${format(
                  selectedDate,
                  "yyyy-MM-dd"
                )}`}
              >
                Nowa wizyta
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Wizyty na {format(selectedDate, "dd MMMM yyyy", { locale: pl })}
              </h3>
              <Button
                variant="secondary"
                size="sm"
                href={`/dashboard/appointments/new?date=${format(
                  selectedDate,
                  "yyyy-MM-dd"
                )}`}
              >
                Dodaj wizytę
              </Button>
            </div>

            {isLoading ? (
              <div className="text-center py-8">Ładowanie...</div>
            ) : dayAppointments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Brak wizyt na wybrany dzień
              </div>
            ) : (
              <div className="space-y-3">
                {dayAppointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">
                            {format(new Date(appointment.startTime), "HH:mm")} -
                            {format(new Date(appointment.endTime), "HH:mm")}
                          </span>
                          <Badge
                            variant={getStatusBadgeVariant(appointment.status)}
                          >
                            {getStatusText(appointment.status)}
                          </Badge>
                        </div>
                        <p className="text-gray-900 font-medium">
                          {appointment.patient?.personalInfo?.firstName}{" "}
                          {appointment.patient?.personalInfo?.lastName}
                        </p>
                        <p className="text-sm text-gray-600">
                          Fizjoterapeuta:{" "}
                          {appointment.employee?.personalInfo?.firstName}{" "}
                          {appointment.employee?.personalInfo?.lastName}
                        </p>
                        {appointment.notes && (
                          <p className="text-sm text-gray-600 mt-1">
                            Uwagi: {appointment.notes}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          href={`/dashboard/appointments/${appointment._id}`}
                        >
                          Szczegóły
                        </Button>
                        {appointment.status === "scheduled" && (
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => confirmAppointment(appointment._id)}
                          >
                            Potwierdź
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
