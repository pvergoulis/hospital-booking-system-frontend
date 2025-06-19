import {type userLoginType,type userType } from "../types/userTypes"
import axios from "axios";


const API_URL = "http://localhost:3000/api/users"


export const loginUser = async(username: string, password : string): Promise<userLoginType> =>{
  
      const res = await axios.post<userLoginType>(`${API_URL}/login`, {
      username,
      password,
      
    });
     if (!res) throw new Error("Failed to fetch user login.");
    const data = res.data
    return data
        
   
}


export const registerUser = async(newUser: userType): Promise<userType> =>{

    const res = await axios.post<userType>(`${API_URL}/create`,newUser)
    if (!res) throw new Error("Failed to fetch user create.");
    const data = res.data
    return data
}