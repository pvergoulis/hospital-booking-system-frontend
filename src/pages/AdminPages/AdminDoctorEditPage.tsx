import { useEffect, useState } from "react";
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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router";
import {
  getDoctorByLastname,
  updateDoctorById,
} from "../../services/doctorApi";
import { getAllSpecialization } from "../../services/specializationApi";
import { getAllClinics } from "../../services/clinicsApi";
import { doctorSchema, type doctorType } from "../../types/doctorTypes";
import { type specializationType } from "../../services/specializationApi";
import { type clinicType } from "../../services/clinicsApi";

const AdminDoctorEditPage = () => {
  const { lastname } = useParams<{ lastname: string }>();
  const navigate = useNavigate();

  const [specializations, setSpecializations] = useState<specializationType[]>(
    []
  );
  const [clinics, setClinics] = useState<clinicType[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<doctorType>({
    resolver: zodResolver(doctorSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!lastname) return;
        const doctor = await getDoctorByLastname(lastname);
        setValue("firstname", doctor.firstname);
        setValue("lastname", doctor.lastname);
        setValue("_id", doctor._id);
        setValue("image", doctor.image || "");
        setValue("experience", doctor.experience || "");
        setValue("cv", doctor.cv || "");
        setValue("amka", doctor.amka || "");
        setValue("specialization", doctor.specialization);
        setValue("clinic", doctor.clinic);
        setValue("availableHours", doctor.availableHours || []);

        const [specializationsData, clinicsData] = await Promise.all([
          getAllSpecialization(),
          getAllClinics(),
        ]);
        setSpecializations(specializationsData);
        setClinics(clinicsData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();
  }, [lastname, setValue]);


  const onSubmit = async (data: doctorType) => {
    console.log("Submitted data :", data);
    try {
      const payload = {
        firstname: data.firstname,
        lastname: data.lastname,
        image: data.image,
        experience: data.experience,
        cv: data.cv,
        amka: data.amka,
        specialization: data.specialization,
        clinic: data.clinic,
      };
      await updateDoctorById(data._id, payload);
      setSuccess(true);
      setTimeout(() => {
        navigate("/doctor-admin");
      }, 2000);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (loadingData) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ marginTop: "4rem", marginBottom: "4rem" }}>
      <Typography
        variant="h4"
        mt={4}
        gutterBottom
        sx={{ fontWeight: "bold" }}
        className="text-sky-400 text-center"
      >
        Edit Doctor
      </Typography>

      {success && (
        <Typography
          variant="h5"
          mt={4}
          gutterBottom
          sx={{ fontWeight: "bold" }}
          className="text-green-400 text-center"
        >
          Success Update
        </Typography>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="First Name"
          fullWidth
          margin="normal"
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
          margin="normal"
          {...register("lastname")}
          error={!!errors.lastname}
          helperText={errors.lastname?.message}
           FormHelperTextProps={{
            sx: { color: "#d32f2f", fontWeight: "bold" },
          }}
        />

        {/* AMKA */}
        <TextField
          label="AMKA"
          fullWidth
          margin="normal"
          {...register("amka")}
          error={!!errors.amka}
          helperText={errors.amka?.message}
           FormHelperTextProps={{
            sx: { color: "#d32f2f", fontWeight: "bold" },
          }}
        />

        {/* Specialization Select */}
        <FormControl fullWidth margin="normal" error={!!errors.specialization}>
          <InputLabel id="specialization-label">Specialization</InputLabel>
          <Controller
            control={control}
            name="specialization"
            render={({ field }) => (
              <Select
                labelId="specialization-label"
                label="Specialization"
                {...field}
                onChange={(e) => {
                  const selected = specializations.find(
                    (s) => s._id === e.target.value
                  );
                  field.onChange(selected);
                }}
                value={field.value?._id || ""}
              >
                {specializations.map((spec) => (
                  <MenuItem key={spec._id} value={spec._id}>
                    {spec.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>
            {errors.specialization?.message ||
              errors.specialization?.name?.message}
              
          </FormHelperText>
        </FormControl>

        {/* Clinic Select */}
        <FormControl fullWidth margin="normal" error={!!errors.clinic}>
          <InputLabel id="clinic-label">Clinic</InputLabel>
          <Controller
            control={control}
            name="clinic"
            render={({ field }) => (
              <Select
                labelId="clinic-label"
                label="Clinic"
                {...field}
                onChange={(e) => {
                  const selected = clinics.find(
                    (c) => c._id === e.target.value
                  );
                  field.onChange(selected);
                }}
                value={field.value?._id || ""}
              >
                {clinics.map((clinic) => (
                  <MenuItem key={clinic._id} value={clinic._id}>
                    {clinic.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>
            {errors.clinic?.message || errors.clinic?.name?.message}
          </FormHelperText>
        </FormControl>

        <TextField
          label="Experience"
          fullWidth
          margin="normal"
          {...register("experience")}
        />

        <TextField
          label="CV"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          {...register("cv")}
        />

        <TextField
          label="Image (URL)"
          fullWidth
          margin="normal"
          {...register("image")}
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
      </form>
    </Container>
  );
};

export default AdminDoctorEditPage;
