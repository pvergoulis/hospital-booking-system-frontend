import { useEffect, useState } from "react";
import {
  DataGrid,
  type GridColDef,
} from "@mui/x-data-grid";
import { getAllDoctors } from "../../services/doctorApi";
import { type doctorTypeCard } from "../../types/doctorTypes";
import { Box, TextField, Typography, Button, Stack } from "@mui/material";
import { NavLink, useNavigate } from "react-router";
import { type GridRenderCellParams } from "@mui/x-data-grid";

const AdminDoctorPage = () => {
  const [doctors, setDoctors] = useState<doctorTypeCard[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });
  const navigate = useNavigate();

  const handleRowClick = (params: any) => {
    const lastname = params.row.lastname;
    navigate(`/doctors/${lastname}`);
  };

  const handleDelete = (doctor: doctorTypeCard) => {
    console.log("Delete doctor:", doctor);
    // Εδώ κάνεις το API call για διαγραφή
    // π.χ. await deleteDoctor(doctor._id);
  };

  const handleUpdate = (doctor: doctorTypeCard) => {
    console.log("Update doctor:", doctor);
    navigate(`/doctors/edit/${doctor.lastname}`);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      document.title = "Parvathy Hospital | Doctors Page";
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
      doc.specialization &&
      doc.specialization.name &&
      doc.clinic &&
      doc.clinic.name &&
      doc.firstname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: GridColDef[] = [
    { field: "firstname", headerName: "Firstname", flex: 1, sortable: true },
    { field: "lastname", headerName: "Lastname", flex: 1, sortable: true },
    {
      field: "specialization",
      headerName: "Specialization",
      flex: 1,
      sortable: true,
      renderCell: (params) => {
        const spec = params.value;
        if (!spec || typeof spec !== "object") return "—";
        return spec.name || "—";
      },
      sortComparator: (v1, v2) => {
        const name1 = v1?.name?.toLowerCase() || "";
        const name2 = v2?.name?.toLowerCase() || "";
        return name1.localeCompare(name2);
      },
    },
    {
      field: "clinic",
      headerName: "Clinic",
      flex: 1,
      sortable: true,
      renderCell: (params) => {
        const clinic = params.value;
        if (!clinic || typeof clinic !== "object") return "—";
        return clinic.name || "—";
      },
      sortComparator: (v1, v2) => {
        const name1 = v1?.name?.toLowerCase() || "";
        const name2 = v2?.name?.toLowerCase() || "";
        return name1.localeCompare(name2);
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<doctorTypeCard>) => (
        <Stack
          direction="row"
          spacing={2}
          marginTop="0.7rem"
        >
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
              handleDelete(params.row);
            }}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ padding: "4rem" }}>
      <div className="flex justify-between items-center">
        <Typography
          variant="h5"
          gutterBottom
          className="text-red-500  pt-4 pb-4 text"
        >
          Doctor's List
        </Typography>

        <Typography sx={{ fontSize: "1.2rem" }} className="text-cyan-500">
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
  );
};

export default AdminDoctorPage;
