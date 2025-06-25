import { useEffect, useState } from "react";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import { getAllDoctors, deleteDoctorById } from "../../services/doctorApi";
import { type doctorTypeCard } from "../../types/doctorTypes";
import {
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router";

const AdminDoctorPage = () => {
  const [doctors, setDoctors] = useState<doctorTypeCard[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });

  const [openConfirm, setOpenConfirm] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState<doctorTypeCard | null>(
    null
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      document.title = "Parvathy Hospital | Admin Doctors Page";
      try {
        const data = await getAllDoctors();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc &&
      doc._id &&
      doc.specialization?.name &&
      doc.clinic?.name &&
      doc.firstname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openDeleteDialog = (doctor: doctorTypeCard) => {
    setDoctorToDelete(doctor);
    setOpenConfirm(true);
  };

  const handleCloseDialog = () => {
    setOpenConfirm(false);
    setDoctorToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!doctorToDelete?._id) return;

    try {
      await deleteDoctorById(doctorToDelete._id);
      setDoctors((prev) => prev.filter((d) => d._id !== doctorToDelete._id));
    } catch (error) {
      console.error("Failed to delete doctor:", error);
      alert("Failed to delete doctor. Please try again.");
    } finally {
      handleCloseDialog();
    }
  };

  const handleRowClick = (params: any) => {
    const lastname = params.row.lastname;
    navigate(`/doctors/${lastname}`);
  };

  const handleUpdate = (doctor: doctorTypeCard) => {
    navigate(`/doctors/edit/${doctor.lastname}`);
  };

  const columns: GridColDef[] = [
    { field: "firstname", headerName: "Firstname", flex: 1, sortable: true },
    { field: "lastname", headerName: "Lastname", flex: 1, sortable: true },
    {
      field: "specialization",
      headerName: "Specialization",
      flex: 1,
      sortable: true,
      renderCell: (params) => params.value?.name || "—",
      sortComparator: (v1, v2) =>
        (v1?.name || "").localeCompare(v2?.name || ""),
    },
    {
      field: "clinic",
      headerName: "Clinic",
      flex: 1,
      sortable: true,
      renderCell: (params) => params.value?.name || "—",
      sortComparator: (v1, v2) =>
        (v1?.name || "").localeCompare(v2?.name || ""),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<doctorTypeCard>) => (
        <Stack direction="row" spacing={2} marginTop="0.7rem">
          
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/doctor/appointments/${params.row._id}`);
            }}
          >
            Appointments
          </Button>

          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleUpdate(params.row);
            }}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              openDeleteDialog(params.row);
            }}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ padding: "4rem", minHeight: "60vh" }}>
      <div className="flex justify-between items-center">
        <Typography
          variant="h5"
          gutterBottom
          className="text-red-500 pt-4 pb-4"
        >
          Doctor's List
        </Typography>
        <Typography
          sx={{ fontSize: "1.3rem", fontWeight: "bold" }}
          className="text-cyan-500 underline"
        >
          <NavLink to="/doctor-create">Click Here to insert new Doctor</NavLink>
        </Typography>
      </div>

      <TextField
        label="Type doctor's firstname"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Box sx={{ overflowX: "auto" }}>
        <Box sx={{ minWidth: 800 }}>
          <DataGrid
            rows={filteredDoctors}
            columns={columns}
            getRowId={(row) => row._id}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            autoHeight
            disableRowSelectionOnClick
            onRowClick={handleRowClick}
            sx={{ zIndex: "1000" }}
          />
        </Box>
      </Box>

      <Dialog open={openConfirm} onClose={handleCloseDialog}>
        <DialogTitle>Delete Doctor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete Dr. {doctorToDelete?.firstname}{" "}
            {doctorToDelete?.lastname}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button color="error" onClick={handleConfirmDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDoctorPage;
