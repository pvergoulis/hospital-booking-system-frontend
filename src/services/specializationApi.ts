import axios from "axios";
import { getToken } from "../utils/authTokenUtils";

export type specializationType = {
    _id : string,
    name : string
}

const API_URL = "http://localhost:3000/api/categories"

export const getAllSpecialization = async () : Promise<specializationType[]> =>{
    const token = getToken();

    const res = await axios.get<{ status: boolean; data: specializationType[] }>(
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