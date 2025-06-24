import { NavLink } from "react-router";
import { useState, useEffect } from "react";
import DoctorCard from "../components/DoctorCard/DoctorCard";
import { getFirstEightDoctors } from "../services/doctorApi";
import {type doctorTypeCard } from "../types/doctorTypes";

const WelcomePage = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<doctorTypeCard[]>([]);
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
      setUsername(storedUsername);
    }
    document.title = "Parvathy Hospital | Welcome Page";

    const fetchDoctors = async () => {
      try {
        const data = await getFirstEightDoctors();
        setDoctors(data);
      } catch (err) {
        console.error("Failed to fetch doctors", err);
      }
    };

    fetchDoctors();
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
            <NavLink
              to="/doctors"
              className=" rounded-full ms-2 p-1 bg-cyan-500 font-bold text-white"
            >
              Book
            </NavLink>
          </p>
        </div>
        <div className="flex-1/3 bg-[#41B6E6] p-6">
          <img
            src="img9.jpg"
            alt=""
            className="max-w-full h-auto rounded-lg shadow-lg "
          />
        </div>
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.map((doc) => (
          <DoctorCard
            key={doc._id}
            _id={doc._id}
            image={doc.image}
            firstname={doc.firstname}
            lastname={doc.lastname}
            specialization={doc.specialization || "null"}
            clinic={doc.clinic || "null"}
          />
        ))}
      </div>
    </>
  );
};

export default WelcomePage;
