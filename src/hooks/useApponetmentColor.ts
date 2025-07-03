import { type AppointmentDoctorType } from "../types/appointmentTypes";
import { type Event as CalendarEvent } from "react-big-calendar";

const statusColors: Record<string, string> = {
  PENDING: "#ffeb3b",
  CONFIRMED: "#4caf50",
  CANCELED: "#f44336",
  REJECTED: "#9e9e9e",
  ACCEPTED: "#2196f3",
  DONE: "#8e24aa",
};

export const useAppointmentColor = () => {
  const eventStyleGetter = (event: CalendarEvent) => {
    const appt: AppointmentDoctorType = event.resource;

    const backgroundColor = statusColors[appt.status] || "#90a4ae";

    return {
      style: {
        backgroundColor,
        color: "#fff",
        borderRadius: "5px",
        border: "none",
        padding: "4px",
      },
    };
  };

  return { eventStyleGetter };
};
