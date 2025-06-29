import { Navigate } from "react-router";
import { getToken } from "../../utils/authTokenUtils";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const token = getToken()

  if (!token) {
    return <Navigate to="/login"  replace />;
  }

  return children;
};

export default RequireAuth;

