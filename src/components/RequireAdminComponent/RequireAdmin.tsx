import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { type DecodedToken } from "../../types/jwtTypes";

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let decoded: DecodedToken;

  try {
    decoded = jwtDecode<DecodedToken>(token);
  } catch (err) {
    console.error("Invalid token", err);
    return <Navigate to="/login" replace />;
  }

  if (decoded.role !== "ADMIN") {
    return <Navigate to="/no-permission" replace />;
  }

  return children;
};

export default RequireAdmin;