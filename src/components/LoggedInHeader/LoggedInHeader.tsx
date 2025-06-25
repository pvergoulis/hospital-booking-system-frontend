import { Menu, X, LogOut } from "lucide-react";
import { NavLink } from "react-router";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { type DecodedToken } from "../../types/jwtTypes";
import { useNavigate } from "react-router";

const LoggedInHeader = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const [role, setRole] = useState<string | null>(null);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   const decoded = jwtDecode<DecodedToken>(token!);
  //   setRole(decoded.role);
  // }, []);
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setRole(decoded.role);
    } catch (err) {
      console.error("Failed to decode token:", err);
      setRole(null);
    }
  } else {
    setRole(null);
  }
}, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <>
      <nav className="flex bg-blue-500 h-24 items-center justify-between p-4 w-full">
        <div>
          <NavLink to="/welcome">
            <img src="/logo4.png" alt="logo" className="w-55 text-white" />
          </NavLink>
        </div>

        <div className="md:hidden">
          <button onClick={handleToggle}>{isOpen ? <X /> : <Menu />}</button>
        </div>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } absolute top-24 left-0 w-full bg-blue-500 p-4 md:static md:block md:w-auto md:p-0`}
        >
          <ul className="md:flex gap-16 text-white text-xl">
            {role?.includes("ADMIN") && (
              <li className="mt-2 mb-2 md:mt-0 md:mb-0">
                <NavLink
                  to="/admin"
                  onClick={handleToggle}
                  className={({ isActive }) =>
                    isActive
                      ? "underline underline-offset-4 text-white font-bold"
                      : "text-white"
                  }
                >
                  Admin
                </NavLink>
              </li>
            )}
            <li className="mt-2 mb-2 md:mt-0 md:mb-0">
              <NavLink
                to="/about"
                onClick={handleToggle}
                className={({ isActive }) =>
                  isActive
                    ? "underline underline-offset-4 text-white font-bold"
                    : "text-white"
                }
              >
                About
              </NavLink>
            </li>

            <li className="mt-2 mb-2 md:mt-0 md:mb-0">
              <NavLink
                to="/doctors"
                onClick={handleToggle}
                className={({ isActive }) =>
                  isActive
                    ? "underline underline-offset-4 text-white font-bold"
                    : "text-white"
                }
              >
                Doctors
              </NavLink>
            </li>

            <li className="mt-2 mb-2 md:mt-0 md:mb-0">
              <NavLink
                to="/myAppointments"
                onClick={handleToggle}
                className={({ isActive }) =>
                  isActive
                    ? "underline underline-offset-4 text-white font-bold"
                    : "text-white"
                }
              >
                My Appointments
              </NavLink>
            </li>
            <li className="mt-2 mb-2 md:mt-0 md:mb-0">
              <button
                className="cursor-pointer"
                onClick={() => {
                  handleToggle();
                  handleLogout();
                }}
              >
                <LogOut />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default LoggedInHeader;
