export type DecodedToken = {
  id: string;
  username: string;
  email: string;
  role: "ADMIN" | "PATIENT" | "DOCTOR";
  exp: number; 
};