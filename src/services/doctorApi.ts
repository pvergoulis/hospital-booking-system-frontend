import { type doctorType, type doctorTypeCard } from "../types/doctorTypes";
import axios from "axios";

const API_URL = "http://localhost:3000/api/doctors";

export const getFirstEightDoctors = async (): Promise<doctorTypeCard[]> => {
  const token = localStorage.getItem("token");

  const res = await axios.get<{ status: boolean; data: doctorTypeCard[] }>(
    `${API_URL}/EightDoctors`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.data.status) throw new Error("Failed to fetch doctors");
  const data = res.data.data;
  return data;
};

export const getAllDoctors = async (): Promise<doctorTypeCard[]> => {
  const token = localStorage.getItem("token");

  const res = await axios.get<{ status: boolean; data: doctorTypeCard[] }>(
    `${API_URL}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.data.status) throw new Error("Failed to fetch doctors");
  const data = res.data.data;
  return data;
};

export const getDoctorByLastname = async (
  lastname: string
): Promise<doctorType> => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get<{
      status: boolean;
      data: doctorType;
      message?: string;
    }>(`${API_URL}/lastname/${lastname}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.data.status) {
      const msg = res.data.message || "Failed to fetch doctor";
      throw new Error(msg);
    }
    return res.data.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.message || `Error: ${error.response.status}`
      );
    }
    throw error;
  }
};

export const updateDoctorById = async (
  id: string,
  updatedData: Partial<doctorType>
): Promise<doctorType> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.patch(`${API_URL}/update/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating doctor:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to update doctor");
  }
};

export const createDoctor = async (
  newDoctor: doctorType
): Promise<doctorType> => {
  const token = localStorage.getItem("token");

  const res = await axios.post<doctorType>(`${API_URL}/create`, newDoctor,{
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  if (!res) throw new Error("Failed to fetch doctor create.");
  const data = res.data;
  return data;
};
