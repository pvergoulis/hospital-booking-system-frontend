import {  type doctorType, type doctorTypeCard } from "../types/doctorTypes"
import axios from "axios";

const API_URL = "http://localhost:3000/api/doctors"


export const getFirstEightDoctors = async (): Promise<doctorTypeCard[]> => {
    const token = localStorage.getItem("token");

    const res = await axios.get<{ status: boolean; data: doctorTypeCard[] }>(
    `${API_URL}/EightDoctors`, {
         headers: {
        Authorization: `Bearer ${token}`,
    },
    }
  );

  if (!res.data.status) throw new Error("Failed to fetch doctors");
  const data = res.data.data
  return data
};


export const getAllDoctors = async () : Promise<doctorTypeCard[]> =>{
    const token = localStorage.getItem("token");

    const res = await axios.get<{ status: boolean; data: doctorTypeCard[] }>(
    `${API_URL}`, {
         headers: {
        Authorization: `Bearer ${token}`,
    },
    }
  )
    if (!res.data.status) throw new Error("Failed to fetch doctors");
    const data = res.data.data
    return data
}


export const getDoctorByLastname = async (lastname: string): Promise<doctorType> => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get<{ status: boolean; data: doctorType; message?: string }>(
      `${API_URL}/lastname/${lastname}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.data.status) {
    
      const msg = res.data.message || "Failed to fetch doctor";
      throw new Error(msg);
    }
    return res.data.data;
  } catch (error: any) {
    if (error.response) {
      
      throw new Error(error.response.data.message || `Error: ${error.response.status}`);
    }
    throw error;
  }
};