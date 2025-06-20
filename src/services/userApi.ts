import {type userType } from "../types/userTypes"
import axios from "axios";


const API_URL = "http://localhost:3000/api/users"


export const registerUser = async(newUser: userType): Promise<userType> =>{

    const res = await axios.post<userType>(`${API_URL}/create`,newUser)
    if (!res) throw new Error("Failed to fetch user create.");
    const data = res.data
    return data
}