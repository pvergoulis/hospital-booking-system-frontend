import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { type DecodedToken } from "../types/jwtTypes";
import { getToken, setToken as saveToken, removeToken } from "../utils/authTokenUtils";

interface AuthContextType {
  token: string | null;
  role: string | null;
  userId: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); //

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setToken(token);
        setRole(decoded.role);
        setUserId(decoded.id);
      } catch (err) {
        console.error("Invalid token", err);
        setToken(null);
        setRole(null);
        setUserId(null);
      }
    }
    setLoading(false);
  }, []);

  const login = (token: string) => {
    saveToken(token);
    const decoded = jwtDecode<DecodedToken>(token);
    setToken(token);
    setRole(decoded.role);
    setUserId(decoded.id);
  };

  const logout = () => {
    removeToken()
    setToken(null);
    setRole(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, userId, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
