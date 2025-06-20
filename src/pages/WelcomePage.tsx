import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import {type DecodedToken } from "../types/jwtTypes";

const WelcomePage = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [role , setRole] = useState<string | null>(null)
    
   useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const token = localStorage.getItem("token")
    
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const decoded = jwtDecode<DecodedToken>(token!)
    setRole(decoded.role)
  }, []);

  return (
    <>
      <div className="mt-24">
        <h1>HAHAH </h1>
        {/* {role?.includes("ADMIN") && <a href="www.google.com" target="blank">Admin</a>} */}
      </div>
    </>
  );
};

export default WelcomePage;
