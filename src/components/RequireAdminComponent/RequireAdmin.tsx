import { Navigate } from "react-router";

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user.role !== "ADMIN") {
    return <Navigate to="/no-permission" replace />;
  }

  return children;
};
export default RequireAdmin;