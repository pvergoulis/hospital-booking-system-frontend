import { type doctorTypeCard } from "../types/doctorTypes"
import axios from "axios";


const API_URL = "http://localhost:3000/api/doctors"


export const getFirstSixDoctors = async (): Promise<doctorTypeCard[]> => {
    const token = localStorage.getItem("token");
  const res = await axios.get<{ status: boolean; data: doctorTypeCard[] }>(
    `${API_URL}/sixDoctors`, {
         headers: {
        Authorization: `Bearer ${token}`,
    },
    }
  );

  if (!res.data.status) throw new Error("Failed to fetch doctors");
  const data = res.data.data
  return data
};