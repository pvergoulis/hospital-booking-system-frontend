import axios from "axios";

export type clinicType = {
    _id : string,
    name : string
}
const API_URL = "http://localhost:3000/api/clinics"


export const getAllClinics = async () : Promise<clinicType[]> =>{
    const token = localStorage.getItem("token");

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