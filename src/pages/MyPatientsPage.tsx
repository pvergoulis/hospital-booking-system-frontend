import { useEffect, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { getAppointmentsByDoctor } from "../services/appointmentApi";


const MyPatientsPage = () => {
  const { userId } = useAuth(); 
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  useEffect(() => {
    document.title = "Parvathy Hospital | My Patients Page";
    const fetchAppointments = async () => {
      try {
        if (userId) {
          const data = await getAppointmentsByDoctor(userId);
          setAppointments(
            data.map((appt: any) => ({
              ...appt,
              userFullName: appt.user
                ? `${appt.user.firstname ?? ""} ${appt.user.lastname ?? ""}`
                : "",
            }))
          );
        }
      } catch (err) {
        console.error("Error loading doctor appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userId]);

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "userFullName",
      headerName: "Patient",
      flex: 1,
    },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "timeSlot", headerName: "Time", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  
  const filteredAppointments = appointments.filter((appt: any) =>
    appt.userFullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 mt-16 text-center text-blue-500 w-full min-h-[50vh]">
      <h1 className="text-2xl font-bold mb-4">My Patients </h1>
      <TextField
        label="Patient search"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        className="mb-4"
      />
      <DataGrid
        rows={filteredAppointments}
        columns={columns}
        getRowId={(row) => row._id}
        loading={loading}
        pageSizeOptions={[5,10,25]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </div>
  );
};

export default MyPatientsPage;
