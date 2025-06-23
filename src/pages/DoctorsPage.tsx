import { useEffect, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { getAllDoctors } from "../services/doctorApi";
import { type doctorTypeCard } from "../types/doctorTypes";
import { Box, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const DoctorPage = () => {
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
          Click on the doctor you need to book an appointment
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

export default DoctorPage;
