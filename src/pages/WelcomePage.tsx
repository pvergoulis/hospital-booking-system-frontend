import { NavLink } from "react-router";
import { useState, useEffect } from "react";
import DoctorCard from "../components/DoctorCard/DoctorCard";

const WelcomePage = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
      setUsername(storedUsername);
    }
    document.title = "Parvathy Hospital | Welcome Page";
  }, []);

  return (
    <>
      <div className="lg:flex mt-8  justify-around">
        <div className="pt-8 space-y-6 pb-2 bg-sky-50 flex-2/3">
          <h3 className="ms-16 text-2xl text-cyan-600 text-center">
            Welcome to The Parvathy Hospital {username}
          </h3>
          <h1 className="ms-16 text-4xl text-center">
            We are an internationally <br /> renowned hospital.
          </h1>
          <p className="ms-16 mt-2 text-xl text-center">
            Our hospital is home to one of the{" "}
            <span className="text-cyan-600">largest hospitals in India</span>
          </p>
          <p className="ms-16 mt-2 text-xl text-center">
            Find the doctor that you need and book an appointment
            <NavLink to="/doctors"
            className=" rounded-full ms-2 p-1 bg-cyan-500 font-bold text-white"
          >Book</NavLink>
          </p>
          
        </div>
        <div className="flex-1/3 bg-[#41B6E6] pt-6 pb-6 ps-6 ">
          <img src="img9.jpg" alt=""  className="w-150 xl:relative  xl:right-40"/>
          </div>
      </div>

      <div>
        <DoctorCard image="img9.jpg" firstname="Pavlos" lastname="Vergoulis" specialization="Ortho" clinic="Orthope"></DoctorCard>
      </div>
    </>
  );
};

export default WelcomePage;
