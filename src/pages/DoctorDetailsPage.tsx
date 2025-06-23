import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { type doctorType } from "../types/doctorTypes";
import axios from "axios";
import { bookAppointment } from "../services/appointmentApi";
import {  Typography } from "@mui/material";

const DoctorDetailsPage = () => {
  const { lastname } = useParams();
  const [doctor, setDoctor] = useState<doctorType | null>(null);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [success, setSuccess] = useState("");


    const handleBooking = async () => {
    if (!doctor || !date || !timeSlot) return;

    try {
      await bookAppointment({
        doctorId: doctor._id,
        date,
        timeSlot,
      });
      setSuccess("Appointment booked successfully!");
      setDate("");
      setTimeSlot("");
    } catch (err) {
      console.error("Booking failed", err);
    }
  };

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/api/doctors/lastname/${lastname}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDoctor(response.data.data);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };
    fetchDoctor();
  }, [lastname]);

  if (!doctor) return <Typography>Loading...</Typography>;

  return (
    <>
      <div className= "mt-10 border-2 border-cyan-500 rounded-2xl m-4 p-4 grid gap-6 lg:grid-cols-3 w-full max-w-7xl mx-auto md:flex md:items-center">
        <div className=" flex items-center">
          <img
            src={doctor.image}
            alt={doctor.firstname}
            className="w-100 h-100"
          />
        </div>


        <div className=" p-4 space-y-6 w-80">
          <p className="text-sky-600 text-center font-bold ">
            {doctor.firstname} - {doctor.lastname}
          </p>
          <p className="text-center text-xl text-sky-500">
            Experience : {doctor.experience}
          </p>
          <p className="text-center text-xl text-sky-500">
            {doctor.specialization.name}
          </p>
          <p className="mt-8 text-gray-500 break-words text-wrap max-w-full ">{doctor.cv}</p>
        </div>


        <div className=" p-4 space-y-6 w-80">
          <p className="text-sky-600 text-center font-bold ">
            Book an Appointment
          </p>
          <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />

        <select
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        >
          <option value="">Select Time Slot</option>
          <option value="09:00">09:00</option>
          <option value="10:00">10:00</option>
          <option value="11:00">11:00</option>
          <option value="12:00">12:00</option>
          <option value="15:00">15:00</option>
          <option value="16:00">16:00</option>
        </select>

        <button
          onClick={handleBooking}
          className="bg-cyan-500 text-white px-4 py-2 rounded w-full"
        >
          Confirm Appointment
        </button>

        {success && <p className="text-green-600 text-center">{success}</p>}
         
          
        </div>
      </div>
    </>
  
  );
};

export default DoctorDetailsPage;
