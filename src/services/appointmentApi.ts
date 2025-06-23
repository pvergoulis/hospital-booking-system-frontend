import axios from "axios";
import { type AppointmentRequest } from "../types/appointmentTypes";

export const bookAppointment = async (data: AppointmentRequest) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    "http://localhost:3000/api/appointments/book",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};