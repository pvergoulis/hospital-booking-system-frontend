import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getUserByUsername, updateUser } from "../../../services/userApi";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type userUpdateType, updatedUserSchema } from "../../../types/userTypes";

const UpdateUserPage = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<userUpdateType>({
    resolver: zodResolver(updatedUserSchema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!username) return;
        const user = await getUserByUsername(username);
        for (const key in user) {
          setValue(key as keyof userUpdateType, user[key as keyof userUpdateType]);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [username, setValue]);

  const onSubmit = async (data: userUpdateType) => {
    try {
      await updateUser(username!, data);
      console.log("🧪 SUBMITTING DATA:", data);

      setSuccess(true);
      setTimeout(() => {
        navigate("/admin-user");
      }, 2000);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed. Check console for details.")
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }} className="space-y-6">
      <Typography
        variant="h4"
        gutterBottom
        className="text-cyan-500 text-center font-bold"
      >
        Edit User
      </Typography>

      {success && (
        <Typography variant="h6" className="text-green-500 text-center mb-4">
          User updated successfully!
        </Typography>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="First Name"
            fullWidth
            {...register("firstname")}
            error={!!errors.firstname}
            helperText={errors.firstname?.message}
            FormHelperTextProps={{
              sx: { color: "#d32f2f", fontWeight: "bold" },
            }}
          />

          <TextField
            label="Last Name"
            fullWidth
            {...register("lastname")}
            error={!!errors.lastname}
            helperText={errors.lastname?.message}
            FormHelperTextProps={{
              sx: { color: "#d32f2f", fontWeight: "bold" },
            }}
          />

          <TextField
            label="Email"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            FormHelperTextProps={{
              sx: { color: "#d32f2f", fontWeight: "bold" },
            }}
          />

          <TextField
            label="Phone"
            fullWidth
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            FormHelperTextProps={{
              sx: { color: "#d32f2f", fontWeight: "bold" },
            }}
          />

          <TextField
            label="Age"
            fullWidth
            type="number"
            {...register("age", { valueAsNumber: true })}
            error={!!errors.age}
            helperText={errors.age?.message}
            FormHelperTextProps={{
              sx: { color: "#d32f2f", fontWeight: "bold" },
            }}
          />

          <FormControl fullWidth error={!!errors.role}>
            <InputLabel id="role-label">Role</InputLabel>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select
                  labelId="role-label"
                  label="Role"
                  {...field}
                  value={field.value || ""}
                >
                  <MenuItem value="ADMIN">ADMIN</MenuItem>
                  <MenuItem value="PATIENT">PATIENT</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.role?.message}</FormHelperText>
          </FormControl>

          <TextField
            label="Mother's Name"
            fullWidth
            {...register("mothersName")}
          />

          <TextField
            label="Father's Name"
            fullWidth
            {...register("fathersName")}
          />

          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
};

export default UpdateUserPage;
