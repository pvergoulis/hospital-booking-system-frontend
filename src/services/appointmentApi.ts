import axios from "axios";
import {
  type AppointmentRequest,
  type AppointmentType,
 type AppointmentDoctorType
} from "../types/appointmentTypes";
import { getToken } from "../utils/authTokenUtils";

const API_URL: string = `${import.meta.env.VITE_API_URL}/api/appointments`;


export const bookAppointment = async (data: AppointmentRequest) => {
  const token = getToken();

  const res = await axios.post(`${API_URL}/book`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getUserAppointments = async (): Promise<AppointmentType[]> => {
  const token = getToken();

  const res = await axios.get(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.appointments;
};

export const cancelAppointment = async (id: string) => {
  const token = getToken();

  const res = await axios.delete(`${API_URL}/cancel/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getBookedAppointmentsForDoctor = async (
  doctorId: string
): Promise<AppointmentType[]> => {
  const token = getToken();

  const res = await axios.get<{
    status: boolean;
    appointments: AppointmentType[];
  }>(`${API_URL}/doctor/${doctorId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.data.status) throw new Error("Failed to fetch appointments");

  return res.data.appointments;
};

export const updatePastPendingAppointments = async () => {
  const token = getToken();

  const res = await axios.patch(
    `${API_URL}/update-past-pending`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};

export const getAppointmentsByDoctor = async (doctorId: string) => {
  const token = getToken();

  const res = await axios.get(`${API_URL}/doctor/${doctorId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("Raw API response:", res.data);

  if (!res.data.status) throw new Error("Failed to fetch appointments");

  return res.data.data;
};


export const getAllAppointments = async (): Promise<AppointmentDoctorType[]> => {
  const token = getToken();
  console.log("Token used in getAllAppointments:", token);

  if (!token) {
    throw new Error("No auth token found");
  }

  try {
    const res = await axios.get<{status: boolean; data: AppointmentDoctorType[]}>(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('All Appointments response:', res.data);

    if (!res.data.status) throw new Error("Failed to fetch appointments");

    return res.data.data;
  } catch (error) {
    console.error("Axios error in getAllAppointments:", error);
    throw error;
  }
};