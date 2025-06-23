import axios from "axios";
import { type AppointmentRequest, type AppointmentType } from "../types/appointmentTypes";

const API_URL = "http://localhost:3000/api/appointments"


export const bookAppointment = async (data: AppointmentRequest) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${API_URL}/book`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};



export const getUserAppointments = async (): Promise<AppointmentType[]> => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.appointments;
};


export const cancelAppointment = async (id: string) => {
  const token = localStorage.getItem("token");

  const res = await axios.delete(
    `${API_URL}/cancel/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};



export const getBookedAppointmentsForDoctor = async (
  doctorId: string
): Promise<AppointmentType[]> => {
  const token = localStorage.getItem("token");

  const res = await axios.get<{ status: boolean; appointments: AppointmentType[] }>(
    `${API_URL}/doctor/${doctorId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.data.status) throw new Error("Failed to fetch appointments");

  return res.data.appointments;
};