import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  getAppointmentsByDoctor,
  updateAppointmentStatus,
} from "../../../services/appointmentApi";
import { type AppointmentDoctorType } from "../../../types/appointmentTypes";

const statusOptions = [
  "PENDING",
  "CONFIRMED",
  "CANCELED",
  "REJECTED",
  "ACCEPTED",
  "DONE",
];

const AdminDoctorAppointmentsPage = () => {
  const { doctorId } = useParams();
  const [appointments, setAppointments] = useState<AppointmentDoctorType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Parvathy Hospital |  Doctor Appointments Page";
    const fetchAppointments = async () => {
      if (!doctorId) return;

      try {
        const data = await getAppointmentsByDoctor(doctorId);
        setAppointments(
          data.map((appointment: AppointmentDoctorType) => ({
            ...appointment,
            id: appointment._id,
            doctorName: `${appointment.doctor?.firstname?.trim() ?? ""} ${
              appointment.doctor?.lastname?.trim() ?? ""
            }`.trim(),
            patientName: `${appointment.user?.firstname?.trim() ?? ""} ${
              appointment.user?.lastname?.trim() ?? ""
            }`.trim(),
          }))
        );
      } catch (err: any) {
        setError(err.message || "Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const updated = await updateAppointmentStatus(id, newStatus);
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: updated.status } : appt
        )
      );
      toast.success(`Status updated to ${updated.status}`);
    } catch (err) {
      console.error("Failed to update status:", err);
       toast.error("Failed to update appointment status");
    }
  };

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "doctorName", headerName: "Doctor", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "timeSlot", headerName: "Time Slot", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Select
          value={params.row.status}
          onChange={(e) =>
            handleStatusChange(params.row._id, e.target.value as string)
          }
          size="small"
          fullWidth
        >
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    { field: "patientName", headerName: "Patient", flex: 1 },
  ];

  const doctor = appointments[0]?.doctor;
  const docName = doctor?.firstname ?? "Unknown";
  const docLastname = doctor?.lastname ?? "";

  return (
    <Box sx={{ padding: "3rem", height: "60vh" }}>
      <Typography
        variant="h5"
        gutterBottom
        color="primary"
        sx={{ textAlign: "center", marginY: "1.5rem" }}
      >
        Appointments for:
        <span className="text-2xl font-bold ps-2">
          {docName} {docLastname}
        </span>
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Box sx={{ mt: 2 }}>
          <DataGrid
            rows={appointments}
            columns={columns}
            getRowId={(row) => row.id}
            autoHeight
            disableRowSelectionOnClick
            paginationModel={{ page: 0, pageSize: 10 }}
            onPaginationModelChange={() => {}}
          />
        </Box>
      )}
    </Box>
  );
};

export default AdminDoctorAppointmentsPage;

