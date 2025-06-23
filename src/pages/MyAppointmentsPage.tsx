import { useEffect, useState } from "react";
import {
  Typography,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  getUserAppointments,
  cancelAppointment,
} from "../services/appointmentApi";
import { type AppointmentType } from "../types/appointmentTypes";

const MyAppointmentsPage = () => {
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getUserAppointments();
        setAppointments(data);
      } catch (error) {
        console.error("Failed to fetch appointments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const openCancelDialog = (id: string) => {
    setAppointmentToCancel(id);
    setOpenConfirm(true);
  };

  const handleClose = () => {
    setOpenConfirm(false);
    setAppointmentToCancel(null);
  };

  const handleConfirmCancel = async () => {
    if (!appointmentToCancel) return;
     try {
      await cancelAppointment(appointmentToCancel);
      setAppointments((prev) => prev.filter((appt) => appt._id !== appointmentToCancel));
      setError(null);
    } catch (err) {
      
      setError("Failed to cancel appointment");
    } finally {
      handleClose();
    }
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (loading) return <CircularProgress />;


 return (
    <div className="max-w-4xl mx-auto mt-10 p-4 min-h-[55vh]">
      <Typography variant="h4" className="mb-4 text-center text-sky-700 ">
        My Appointments
      </Typography>

      {appointments.length === 0 ? (
        <Typography variant="body1">You have no appointments.</Typography>
      ) : (
        <div className="space-y-6">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="border-2 border-cyan-500 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center"
            >
              <div className="flex items-center space-x-4">
                {appt.doctor.image && (
                  <img
                    src={appt.doctor.image}
                    alt={appt.doctor.firstname}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold text-lg text-sky-600">
                    Dr. {appt.doctor.firstname} {appt.doctor.lastname}
                  </p>
                  <p className="text-gray-500">
                    {appt.doctor.specialization.name}
                  </p>
                </div>
              </div>

              <div className="text-center md:text-right mt-4 md:mt-0">
                <p className="text-sm text-gray-700">
                  Date: {new Date(appt.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-700">Time: {appt.timeSlot}</p>
                <p
                  className={`text-sm font-semibold ${
                    appt.status === "CANCELED"
                      ? "text-red-500"
                      : appt.status === "CONFIRMED"
                      ? "text-green-600"
                      : "text-yellow-500"
                  }`}
                >
                  Status: {appt.status}
                </p>
              </div>

              <Button
                variant="contained"
                color="error"
                onClick={() => openCancelDialog(appt._id)}
              >
                Cancel
              </Button>
            </div>
          ))}
        </div>
      )}

      <Dialog open={openConfirm} onClose={handleClose}>
        <DialogTitle>Cancel Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this appointment? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button color="error" onClick={handleConfirmCancel} autoFocus>
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  
};

export default MyAppointmentsPage;
