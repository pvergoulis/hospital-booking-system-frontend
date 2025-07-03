import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import moment from "moment";
// import "moment/locale/el";
import {
  Calendar,
  dateFnsLocalizer,
  Views,
  type Event as CalendarEvent,
} from "react-big-calendar";
import {
  getAppointmentsByDoctor,
  updateAppointmentStatus,
} from "../services/appointmentApi";
import { useAuth } from "../context/AuthContext";
import { type AppointmentDoctorType } from "../types/appointmentTypes";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { el } from "date-fns/locale/el";
import { useAppointmentColor } from "../hooks/useApponetmentColor";

const locales = {
  el: el,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

moment.locale("el");

const statusOptions = [
  "PENDING",
  "CONFIRMED",
  "CANCELED",
  "REJECTED",
  "ACCEPTED",
  "DONE",
];

const DoctorAppointmentsPage = () => {
  const { userId } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentDoctorType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentDate, setCurrentDate] = useState(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentDoctorType | null>(null);

  useEffect(() => {
    document.title = "Hospital | Doctor Appointments";

    const fetchAppointments = async () => {
      if (!userId) return;
      try {
        const data = await getAppointmentsByDoctor(userId);
        setAppointments(
          data.map((appt: AppointmentDoctorType) => ({
            ...appt,
            id: appt._id,
          }))
        );
      } catch (err: any) {
        setError(err.message || "Failed loading appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userId]);

  const events: CalendarEvent[] = appointments.map((appt) => ({
    id: appt._id,
    title: `${appt.user?.firstname ?? ""} ${appt.user?.lastname ?? ""} - ${
      appt.status
    }`,
    start: new Date(appt.date),
    end: new Date(moment(appt.date).add(30, "minutes").toISOString()),
    resource: appt,
  }));

  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };

  const handleSelectEvent = (event: any) => {
    const appt: AppointmentDoctorType = event.resource;
    setSelectedAppointment(appt);
    setDialogOpen(true);
  };

  const handleStatusUpdate = async () => {
    if (!selectedAppointment) return;

    try {
      const updated = await updateAppointmentStatus(
        selectedAppointment._id,
        selectedAppointment.status
      );
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === selectedAppointment._id
            ? { ...appt, status: updated.status }
            : appt
        )
      );
      setDialogOpen(false);
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const { eventStyleGetter } = useAppointmentColor();

  console.log("raw date from db:", selectedAppointment?.date);
  return (
    <Box sx={{ padding: "3rem" }}>
      <Typography
        variant="h5"
        gutterBottom
        color="primary"
        sx={{ textAlign: "center", marginBottom: "2rem" }}
      >
        Your Appointments
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          style={{ height: "75vh" }}
          defaultView={Views.MONTH}
          views={[Views.MONTH]}
          date={currentDate}
          onNavigate={handleNavigate}
          onSelectEvent={handleSelectEvent}
          popup
          eventPropGetter={eventStyleGetter}
        />
      )}

      
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Change Appointment Status</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Patient : {selectedAppointment?.user?.firstname}{" "}
            {selectedAppointment?.user?.lastname}
          </Typography>
       

          <Typography gutterBottom>
            Date:{" "}
            {selectedAppointment?.date && selectedAppointment?.timeSlot
              ? `${moment(selectedAppointment.date).format(
                  "dddd D MMMM YYYY"
                )}, ${selectedAppointment.timeSlot}`
              : "No date"}
          </Typography>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={selectedAppointment?.status ?? ""}
              label="Status"
              onChange={(e) => {
                if (selectedAppointment) {
                  setSelectedAppointment({
                    ...selectedAppointment,
                    status: e.target.value,
                  });
                }
              }}
            >
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleStatusUpdate}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DoctorAppointmentsPage;
