
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="flex bg-blue-500 h-24 items-center justify-between p-4 w-full fixed ">
        <div>
          <img
            src="/logo4.png"
            alt="logo"
            className="w-55 text-white"
          />
        </div>

        <div className="md:hidden">
          <button onClick={handleToggle}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } absolute top-24 left-0 w-full bg-blue-500 p-4 md:static md:block md:w-auto md:p-0`}
        >
          <ul className="md:flex gap-16 text-white text-xl">
            <li className="mt-2 mb-2 md:mt-0 md:mb-0">
              <NavLink to="/" onClick={handleToggle}>
                Home
              </NavLink>
            </li>
            <li className="mt-2 mb-2 md:mt-0 md:mb-0">
              <NavLink to="/register" onClick={handleToggle}>
                Register
              </NavLink>
            </li>
            <li className="mt-2 mb-2 md:mt-0 md:mb-0">
              <NavLink to="/login" onClick={handleToggle}>
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
