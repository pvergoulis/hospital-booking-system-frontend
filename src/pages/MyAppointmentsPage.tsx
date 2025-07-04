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
  Avatar,
  TextField,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  getUserAppointments,
  cancelAppointment,
  updatePastPendingAppointments,
} from "../services/appointmentApi";
import { type AppointmentType } from "../types/appointmentTypes";

const parseAppointmentDateTime = (dateStr: string, timeStr: string) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date(dateStr);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

const MyAppointmentsPage = () => {
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState<string | null>(
    null
  );
  const [searchDoctor, setSearchDoctor] = useState("");

  const updateStatuses = (appointments: AppointmentType[]) => {
    const now = new Date();
    return appointments.map((appt) => {
      if (appt.status === "PENDING") {
        const apptDateTime = parseAppointmentDateTime(appt.date, appt.timeSlot);
        if (apptDateTime <= now) {
          return { ...appt, status: "CONFIRMED" };
        }
      }
      return appt;
    });
  };

  useEffect(() => {
    const fetchAndUpdateAppointments = async () => {
      try {
        await updatePastPendingAppointments();
        const data = await getUserAppointments();
        const updatedAppointments = updateStatuses(data);
        setAppointments(updatedAppointments);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch appointments or update statuses", error);
        setError("Failed to fetch appointments or update statuses");
      } finally {
        setLoading(false);
      }
    };

    fetchAndUpdateAppointments();
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
      setAppointments((prev) =>
        prev.filter((appt) => appt._id !== appointmentToCancel)
      );
      setError(null);
    } catch (err) {
      setError("Failed to cancel appointment");
    } finally {
      handleClose();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CANCELED":
        return "red";
      case "CONFIRMED":
        return "green";
      case "DONE":
        return "purple";
      case "ACCEPTED":
        return "blue";
      case "REJECTED":
        return "gray";
      case "PENDING":
      default:
        return "orange";
    }
  };

  const columns: GridColDef[] = [
    {
      field: "doctor",
      headerName: "Doctor",
      flex: 2,
      sortable: true,
      sortComparator: (a, b) => {
        // a, b είναι τα doctor objects
        const nameA = a && typeof a === "object" ? `${a.firstname} ${a.lastname}`.toLowerCase() : "";
        const nameB = b && typeof b === "object" ? `${b.firstname} ${b.lastname}`.toLowerCase() : "";
        return nameA.localeCompare(nameB);
      },
      renderCell: (params) => {
        const doctor = params.value;
        if (!doctor) return <span className="text-red-500">Unknown</span>;
        return (
          <div className="flex items-center gap-2">
            <Avatar src={doctor.image} alt={doctor.firstname} />
            <span>
              Dr. {doctor.firstname} {doctor.lastname}
            </span>
          </div>
        );
      },
    },
    {
      field: "specialization",
      headerName: "Specialization",
      sortable: true,
      flex: 1,
      renderCell: (params: any) => {
        const doctor = params.row.doctor;
        if (!doctor) return "—";
        return typeof doctor.specialization === "object"
          ? doctor.specialization.name
          : doctor.specialization;
      },
    },
    {
      field: "date",
      headerName: "Date",
      flex: 0.8,
      renderCell: (params: any) => {
        const dateValue = params.row.date;
        if (!dateValue) return "—";
        const dateObj = new Date(dateValue);
        return isNaN(dateObj.getTime()) ? "—" : dateObj.toLocaleDateString();
      },
    },
    {
      field: "timeSlot",
      headerName: "Time",
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      renderCell: (params) => (
        <span
          style={{ color: getStatusColor(params.value), fontWeight: "bold" }}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.7,
      renderCell: (params) => {
        const appt = params.row;
        if (["PENDING", "CONFIRMED"].includes(appt.status)) {
          return (
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => openCancelDialog(appt._id)}
            >
              Cancel
            </Button>
          );
        }
        return null;
      },
    },
  ];

  // Filter appointments by doctor name
  const filteredAppointments = appointments.filter((appt) => {
    if (!searchDoctor.trim()) return true;
    const doctor = appt.doctor;
    if (!doctor) return false;
    const fullName = `${doctor.firstname} ${doctor.lastname}`.toLowerCase();
    return fullName.includes(searchDoctor.trim().toLowerCase());
  });

  if (loading) return <CircularProgress />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4 min-h-[55vh]">
      <Typography variant="h4" className="mb-6 text-center text-sky-700">
        My Appointments
      </Typography>
      <div className="mb-4 flex justify-end">
        <TextField
          label="Search by Doctor Name"
          variant="outlined"
          fullWidth
          value={searchDoctor}
          onChange={(e) => setSearchDoctor(e.target.value)}
        />
      </div>
      {appointments.length === 0 ? (
        <Typography variant="body1" className="text-center text-red-600">
          You have no appointments.
        </Typography>
      ) : (
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={filteredAppointments}
            columns={columns}
            getRowId={(row) => row._id}
            pageSizeOptions={[5, 10, 20]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
            }}
          />
        </div>
      )}

      <Dialog open={openConfirm} onClose={handleClose}>
        <DialogTitle>Cancel Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this appointment? This action cannot
            be undone.
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
