import {type userType, type userUpdateType } from "../types/userTypes"
import axios from "axios";
import { getToken } from "../utils/authTokenUtils";

const API_URL = "http://localhost:3000/api/users"


export const registerUser = async(newUser: userType): Promise<userType> =>{

    const res = await axios.post<userType>(`${API_URL}/create`,newUser)
    if (!res) throw new Error("Failed to fetch user create.");
    const data = res.data
    return data
}


export const getAllUsers = async():Promise<userType[]> =>{
    const res = await axios.get<{status: boolean; data: userType[]}>(`${API_URL}`)

     if (!res.data.status) throw new Error("Failed to fetch dall users");
     const data = res.data.data
     return data
}

export const deleteUserById = async (id: string) => {
  const token = getToken();

  const res = await axios.delete(`${API_URL}/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getUserByUsername = async (username: string): Promise<userType> => {
  const token = getToken();
  const res = await axios.get(`${API_URL}/${username}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};


export const updateUser = async (username: string, updatedUser: userUpdateType) => {
  const token = getToken();

  const res = await axios.patch(`${API_URL}/update/${username}`, updatedUser, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};