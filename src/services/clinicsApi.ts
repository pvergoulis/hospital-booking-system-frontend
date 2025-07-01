import axios from "axios";
import { getToken } from "../utils/authTokenUtils";

export type clinicType = {
    _id : string,
    name : string
}

const API_URL: string = `${import.meta.env.VITE_API_URL}/api/clinics`;



export const getAllClinics = async () : Promise<clinicType[]> =>{
    const token = getToken() 

    const res = await axios.get<{ status: boolean; data: clinicType[] }>(
    `${API_URL}`, {
         headers: {
        Authorization: `Bearer ${token}`,
    },
    }
  )
    if (!res.data.status) throw new Error("Failed to fetch specialization");
    const data = res.data.data
    return data
}