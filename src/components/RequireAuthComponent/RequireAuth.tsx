import { Navigate } from "react-router";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login"  replace />;
  }

  return children;
};

export default RequireAuth;


// import { Navigate } from "react-router";
// import { useAuth } from "../../context/AuthContext";

// const RequireAuth = ({ children }: { children: React.ReactNode }) => {
//   const { token } = useAuth();

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default RequireAuth;