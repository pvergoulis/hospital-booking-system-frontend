export type DecodedToken = {
  id: string;
  username: string;
  email: string;
  role: "ADMIN" | "PATIENT";
  exp: number; 
};