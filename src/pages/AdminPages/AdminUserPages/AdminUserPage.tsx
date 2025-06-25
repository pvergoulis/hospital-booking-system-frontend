import { useEffect, useState } from "react";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import { getAllUsers, deleteUserById } from "../../../services/userApi";
import { type userType } from "../../../types/userTypes";
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
import { useNavigate } from "react-router";

const AdminUserPage = () => {
  const [users, setUsers] = useState<userType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 8,
  });

  const [openConfirm, setOpenConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<userType | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Parvathy Hospital | Admin User Page";
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) =>
    u.firstname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openDeleteDialog = (user: userType) => {
    setUserToDelete(user);
    setOpenConfirm(true);
  };

  const handleCloseDialog = () => {
    setOpenConfirm(false);
    setUserToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete?._id) return;

    try {
      await deleteUserById(userToDelete._id);
      setUsers((prev) => prev.filter((u) => u._id !== userToDelete._id));
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Failed to delete user. Please try again.");
    } finally {
      handleCloseDialog();
    }
  };

  const columns: GridColDef[] = [
    { field: "firstname", headerName: "Firstname", flex: 1, sortable: true },
    { field: "lastname", headerName: "Lastname", flex: 1, sortable: true },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "age", headerName: "Age", flex: 1 },
    { field: "amka", headerName: "AMKA", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "vat", headerName: "VAT", flex: 1 },
    { field: "mothersName", headerName: "Mother's Name", flex: 1 },
    { field: "fathersName", headerName: "Father's Name", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<userType>) => (
        <Stack direction="row" spacing={2} marginTop="0.7rem">
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/update-user/${params.row.username}`, {
                state: { userData: params.row }, // στέλνεις τα δεδομένα μέσω state
              });
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
      <Typography variant="h5" gutterBottom className="text-red-500 pt-4 pb-4">
        Users List
      </Typography>

      <TextField
        label="Type user's firstname"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Box sx={{ overflowX: "auto" }}>
        <Box sx={{ minWidth: 1200 }}>
          <DataGrid
            rows={filteredUsers}
            columns={columns}
            getRowId={(row) => row._id}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            autoHeight
            disableRowSelectionOnClick
          />
        </Box>
      </Box>

      <Dialog open={openConfirm} onClose={handleCloseDialog}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {userToDelete?.firstname}{" "}
            {userToDelete?.lastname}? This action cannot be undone.
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

export default AdminUserPage;
