import { useEffect, useState } from "react";
import StepperWizzard from "../../../components/Stepper/StepperWizzard";
import {
  Container,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { toast } from "react-toastify";
import { useStepper } from "../../../hooks/useStepper";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createDoctorSchema,
  type doctorCreateType,
} from "../../../types/doctorTypes";
import { type specializationType } from "../../../services/specializationApi";
import { type clinicType } from "../../../services/clinicsApi";
import { getAllSpecialization } from "../../../services/specializationApi";
import { getAllClinics } from "../../../services/clinicsApi";
import { createDoctor } from "../../../services/doctorApi";
import { useDoctorStepValidation } from "../../../hooks/useDoctorStepValidation";
import { useNavigate } from "react-router";

const AdminDoctorCreatePage = () => {
  const { step, nextStep, prevStep } = useStepper(2);
  

  const [specializations, setSpecializations] = useState<specializationType[]>(
    []
  );
  const [clinics, setClinics] = useState<clinicType[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Parvathy Hospital | Create Doctor Page";
    const fetchData = async () => {
      try {
        const [specializationsData, clinicsData] = await Promise.all([
          getAllSpecialization(),
          getAllClinics(),
        ]);
        setSpecializations(specializationsData);
        setClinics(clinicsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, touchedFields },
  } = useForm<doctorCreateType>({
    resolver: zodResolver(createDoctorSchema),
    mode: "onChange",
    defaultValues: {
      specialization: { _id: "", name: "" },
      clinic: { _id: "", name: "" },
    },
  });

  const watchFields = watch();
  const { isDisabledStepOne, isDisabledStepTwo, isDisabledStepThree } =
    useDoctorStepValidation(watchFields);

  const onSubmit = async (data: doctorCreateType) => {
    console.log("Submitted data", data);

    const payload = ({
      ...data,
      specialization: data.specialization._id,
      clinic: data.clinic._id,
    }as any);
    try {
      await createDoctor(payload);
      toast.success("Doctor registered successfully!");

      console.log("Doctor registered successfully:");
      setTimeout(() => {
        navigate("/doctor-admin");
      }, 2000);
    } catch (error) {
      console.log("Error in creating new doctor", error);
      toast.error("Failed to create doctor. Please try again.");
    }
  };

  return (
    <>
      <Container className="mt-16 border-3 border-blue-400 rounded-xl space-y-7 pb-6  mb-6 min-h-[55vh]">
        <StepperWizzard step={step} />
        <Typography
          component="h1"
          sx={{
            fontSize: "2.5rem",
            textAlign: "center",
            marginBottom: "1rem",
            fontWeight: "bold",
          }}
          className="text-blue-500 font-bold"
        >
          Create new Doctor
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* step 1 */}
          {step === 0 && (
            <div className="space-y-4">
              <TextField
                placeholder="Firstname"
                fullWidth
                required
                id="firstname"
                label="Firstname"
                {...register("firstname")}
                sx={{ mb: 2 }}
                error={!!errors.firstname && touchedFields.firstname}
                helperText={errors.firstname?.message}
                FormHelperTextProps={{
                  sx: { color: "#d32f2f", fontWeight: "bold" },
                }}
              />

              <TextField
                placeholder="Lastname"
                fullWidth
                required
                id="lastname"
                label="Lastname"
                {...register("lastname")}
                sx={{ mb: 2 }}
                error={!!errors.lastname}
                helperText={errors.lastname?.message}
                FormHelperTextProps={{
                  sx: { color: "#d32f2f", fontWeight: "bold" },
                }}
              />

              <TextField
                placeholder="Experience"
                fullWidth
                required
                id="experience"
                label="Experience"
                {...register("experience")}
                sx={{ mb: 2 }}
                error={!!errors.experience}
                helperText={errors.experience?.message}
                FormHelperTextProps={{
                  sx: { color: "#d32f2f", fontWeight: "bold" },
                }}
              />
            </div>
          )}

          {/* step 2 */}
          {step === 1 && (
            <div className="space-y-4">
              <TextField
                placeholder="Image (URL)"
                fullWidth
                id="image"
                label="Image"
                {...register("image")}
                sx={{ mb: 2 }}
                error={!!errors.image}
                helperText={errors.image?.message}
                FormHelperTextProps={{
                  sx: { color: "#d32f2f", fontWeight: "bold" },
                }}
              />

              <TextField
                placeholder="AMKA"
                fullWidth
                required
                id="AMKA"
                label="AMKA"
                {...register("amka")}
                sx={{ mb: 2 }}
                error={!!errors.amka}
                helperText={errors.amka?.message}
                FormHelperTextProps={{
                  sx: { color: "#d32f2f", fontWeight: "bold" },
                }}
              />

              <TextField
                placeholder="CV"
                fullWidth
                required
                id="cv"
                label="CV"
                {...register("cv")}
                sx={{ mb: 2 }}
                multiline
                rows={4}
                error={!!errors.cv}
                helperText={errors.cv?.message}
                FormHelperTextProps={{
                  sx: { color: "#d32f2f", fontWeight: "bold" },
                }}
              />
            </div>
          )}
          {/* step 3 */}
          {step === 2 && (
            <div className="space-y-4">
              {/* Specialization Select */}
              <Controller
                name="specialization._id"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    error={!!errors.specialization?._id}
                    sx={{ mb: 2 }}
                  >
                    <InputLabel id="specialization-label">
                      Specialization
                    </InputLabel>
                    <Select
                      labelId="specialization-label"
                      id="specialization"
                      label="Specialization"
                      {...field}
                    >
                      {specializations.map((spec) => (
                        <MenuItem key={spec._id} value={spec._id}>
                          {spec.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.specialization?._id && (
                      <FormHelperText>
                        {errors.specialization._id.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />

              {/* Clinic Select */}
              <Controller
                name="clinic._id"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    error={!!errors.clinic?._id}
                    sx={{ mb: 2 }}
                  >
                    <InputLabel id="clinic-label">Clinic</InputLabel>
                    <Select
                      labelId="clinic-label"
                      id="clinic"
                      label="Clinic"
                      {...field}
                    >
                      {clinics.map((clinic) => (
                        <MenuItem key={clinic._id} value={clinic._id}>
                          {clinic.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.clinic?._id && (
                      <FormHelperText>
                        {errors.clinic._id.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />

              {/* Email */}
              <TextField
                placeholder="Email"
                fullWidth
                required
                id="email"
                label="Email"
                {...register("email")}
                sx={{ mb: 2 }}
                error={!!errors.email}
                helperText={errors.email?.message}
                FormHelperTextProps={{
                  sx: { color: "#d32f2f", fontWeight: "bold" },
                }}
              />

              {/* Username */}
              <TextField
                placeholder="Username"
                fullWidth
                required
                id="username"
                label="Username"
                {...register("username")}
                sx={{ mb: 2 }}
                error={!!errors.username}
                helperText={errors.username?.message}
                FormHelperTextProps={{
                  sx: { color: "#d32f2f", fontWeight: "bold" },
                }}
              />

              {/* Password */}
              <TextField
                placeholder="Password"
                fullWidth
                required
                id="password"
                type="password"
                label="Password"
                {...register("password")}
                sx={{ mb: 2 }}
                error={!!errors.password}
                helperText={errors.password?.message}
                FormHelperTextProps={{
                  sx: { color: "#d32f2f", fontWeight: "bold" },
                }}
              />
            </div>
          )}

          <div className="flex justify-between mt-4">
            <Button variant="outlined" onClick={prevStep} disabled={step === 0}>
              Back
            </Button>
            {step < 2 ? (
              <Button
                variant="contained"
                onClick={nextStep}
                disabled={
                  (step === 0 && isDisabledStepOne) ||
                  (step === 1 && isDisabledStepTwo) ||
                  (step === 2 && isDisabledStepThree)
                }
              >
                Next
              </Button>
            ) : (
              <Button type="submit" variant="contained">
                Submit
              </Button>
            )}
          </div>
        </form>
      </Container>
    </>
  );
};

export default AdminDoctorCreatePage;
