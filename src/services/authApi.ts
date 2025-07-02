import {type userLoginType} from "../types/userTypes"
import axios from "axios";

const API_URL: string = `${import.meta.env.VITE_API_URL}/api/auth`;


export const loginUser = async (credentials: userLoginType): Promise<string> => {
  const res = await axios.post<{ status: boolean; data: string }>(
    `${API_URL}/login`,
    credentials
  );

  if (!res.data?.status) throw new Error("Login failed");

  return res.data.data; 
}

export const loginDoctor= async (credentials: userLoginType): Promise<string> => {
  const res = await axios.post<{ status: boolean; data: string }>(
    `${API_URL}/doctor-login`,
    credentials
  );

  if (!res.data?.status) throw new Error("Login failed");

  return res.data.data; 
}
