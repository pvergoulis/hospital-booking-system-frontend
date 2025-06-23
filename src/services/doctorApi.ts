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


export const getDoctorByLastname = async (
  lastname: string
): Promise<doctorType> => {
  const token = localStorage.getItem("token");

  const res = await axios.get<{ status: boolean; data: doctorType}>(
    `${API_URL}/lastname/${lastname}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.data.status) throw new Error("Failed to fetch doctor");
  return res.data.data;
};