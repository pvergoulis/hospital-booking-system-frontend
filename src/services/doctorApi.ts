import { type doctorTypeCard } from "../components/DoctorCard/DoctorCard";
import axios from "axios";


const API_URL = "http://localhost:3000/api/doctors"


export const getFirstSixDoctors = async (): Promise<doctorTypeCard[]> => {
  const res = await axios.get<{ status: boolean; data: doctorTypeCard[] }>(
    `${API_URL}/sixDoctors`
  );

  if (!res.data.status) throw new Error("Failed to fetch doctors");
  const data = res.data.data
  return data
};