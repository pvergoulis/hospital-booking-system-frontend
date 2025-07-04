import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { type doctorType } from "../types/doctorTypes";

import {
  bookAppointment,
  getBookedAppointmentsForDoctor,
} from "../services/appointmentApi";
import { Typography } from "@mui/material";
import { getDoctorByLastname } from "../services/doctorApi";
import { toast } from "react-toastify";

type AppointmentSlot = {
  date: string;
  timeSlot: string;
};

const DoctorDetailsPage = () => {
  const { lastname } = useParams<{ lastname: string }>();
  const [doctor, setDoctor] = useState<doctorType | null>(null);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [bookedSlots, setBookedSlots] = useState<AppointmentSlot[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctorAndAppointments = async () => {
      try {
        setError(null);

        if (!lastname) throw new Error("No lastname provided");

        const doctorData = await getDoctorByLastname(lastname);
        setDoctor(doctorData);

        const appointments = await getBookedAppointmentsForDoctor(
          doctorData._id
        );

        const slots: AppointmentSlot[] = Array.isArray(appointments)
          ? appointments.map((appt) => ({
              date: appt.date.split("T")[0],
              timeSlot: appt.timeSlot,
            }))
          : [];
        setBookedSlots(slots);
        document.title = `Parvathy Hospital | ${lastname} Page`;
      } catch (err) {
        console.error("Error fetching doctor or appointments:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    fetchDoctorAndAppointments();
  }, [lastname]);

  const handleBooking = async () => {
    if (!doctor || !date || !timeSlot) return;

    try {
      await bookAppointment({
        doctorId: doctor._id,
        date,
        timeSlot,
      });

      toast.success(
        `Appointment with doctor ${doctor.firstname} - ${doctor.lastname} booked successfully!`
      );
      setDate("");
      setTimeSlot("");

      // Προσθετουμε το νεο booked slot στο state για να κλειδωσει στο UI
      setBookedSlots((prev) => [...prev, { date, timeSlot }]);
    } catch (err) {
      console.error("Booking failed", err);
      toast.error(
        "This time slot is already booked for this doctor. Error in booking an appointment"
      );
      setError(err instanceof Error ? err.message : "Booking failed");
    }
  };

  // Ελεγχει αν το slot ειναι ηδη booked
  const isSlotBooked = (checkDate: string, checkTime: string) =>
    bookedSlots.some(
      (slot) => slot.date === checkDate && slot.timeSlot === checkTime
    );

  if (!doctor) return <Typography>Loading...</Typography>;

  return (
    <div className="mt-10 border-2 border-cyan-500 rounded-2xl m-4 p-4 grid gap-6 lg:grid-cols-3 w-full max-w-7xl mx-auto md:flex md:items-center min-h-[60vh]">
      <div className="flex items-center">
        <img
          src={doctor.image}
          alt={doctor.firstname}
          className="w-100 h-100"
        />
      </div>

      <div className="p-4 space-y-6 w-80">
        <p className="text-sky-600 text-center font-bold ">
          {doctor.firstname} - {doctor.lastname}
        </p>
        <p className="text-center text-xl text-sky-500">
          Experience: {doctor.experience}
        </p>
        <p className="text-center text-xl text-sky-500">
          {doctor.specialization.name}
        </p>
        <p className="mt-8 text-gray-500 break-words text-wrap max-w-full">
          {doctor.cv}
        </p>
      </div>

      <div className="p-4 space-y-6 w-80">
        <p className="text-sky-600 text-center font-bold">
          Book an Appointment
        </p>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded px-2 py-1 w-full"
          min={new Date().toISOString().split("T")[0]} //  Απαγορευουμε επιλογη παλαιοτερης ημερομηνιας
        />

        <select
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="border rounded px-2 py-1 w-full"
          disabled={!date}
        >
          <option value="">Select Time Slot</option>

          {["09:00", "10:00", "11:00", "12:00", "15:00", "16:00"].map(
            (slot) => (
              <option
                key={slot}
                value={slot}
                disabled={isSlotBooked(date, slot)}
              >
                {slot} {isSlotBooked(date, slot) ? "(Booked)" : ""}
              </option>
            )
          )}
        </select>

        <button
          onClick={handleBooking}
          disabled={!date || !timeSlot || isSlotBooked(date, timeSlot)}
          className="bg-cyan-500 disabled:bg-gray-400 text-white px-4 py-2 rounded w-full"
        >
          Confirm Appointment
        </button>

        {error && (
          <p className="text-red-600 text-center">
            This time slot is already booked for this doctor.
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorDetailsPage;
