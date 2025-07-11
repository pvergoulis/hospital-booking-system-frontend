import { Container, Typography, Button, TextField } from "@mui/material";
import StepperWizzard from "../components/Stepper/StepperWizzard";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type userType } from "../types/userTypes";
import { usePasswordToggle } from "../hooks/usePasswordToggle";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";
import { registerUser } from "../services/userApi";
import { useNavigate } from "react-router";
import { useRegisterStepValidation } from "../hooks/useRegisterStepValidation";
import { useStepper } from "../hooks/useStepper";
import { toast } from "react-toastify";

const RegisterPage = () => {
  useEffect(() => {
    document.title = "Parvathy Hospital | Register Page";
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<userType>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
  });

  const watchedValues = watch();
  const { 
    isDisabledStepOne, 
    isDisabledStepTwo, 
    isDisabledStepThree 
  } = useRegisterStepValidation(watchedValues);


  const { step, nextStep, prevStep } = useStepper(2);
  const { showPassword, togglePassword } = usePasswordToggle();


  const navigate = useNavigate()

  const onSubmit = async (data: userType) => {
    console.log("Submitted data", data);
    try {
      await registerUser(data);
      toast.success(" Success Registration")
      console.log("User registered successfully:");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error) {
      console.log("Error in creating new user", error);
      toast.error("Failed in creating new user")
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
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          {/* step 1 */}
          {step === 0 && (
            <div className="space-y-4">
              <TextField
                placeholder="Enter Username"
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

              <TextField
                placeholder="Enter Email"
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

              <TextField
                placeholder="Enter Password"
                fullWidth
                required
                type={showPassword ? "text" : "password"}
                id="password"
                label="Password"
                {...register("password")}
                sx={{ mb: 2 }}
                error={!!errors.password}
                helperText={errors.password?.message}
                FormHelperTextProps={{
                  sx: { color: "#d32f2f", fontWeight: "bold" },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                placeholder="Confirm Password"
                fullWidth
                required
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                label="Confirm Password"
                {...register("confirmPassword")}
                sx={{ mb: 2 }}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                FormHelperTextProps={{
                  sx: { color: "#d32f2f", fontWeight: "bold" },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          )}

          {/* step 2 */}
          {step === 1 && (
            <div className="space-y-4">
              <TextField
                label="First Name"
                id="firstname"
                fullWidth
                sx={{ mb: 2 }}
                {...register("firstname")}
                error={!!errors.firstname}
                helperText={errors.firstname?.message}
              />
              <TextField
                label="Last Name"
                id="lastname"
                fullWidth
                sx={{ mb: 2 }}
                {...register("lastname")}
                error={!!errors.lastname}
                helperText={errors.lastname?.message}
              />
              <TextField
                label="Phone"
                id="phone"
                fullWidth
                sx={{ mb: 2 }}
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
              <TextField
                label="Age"
                id="age"
                type="number"
                fullWidth
                sx={{ mb: 2 }}
                {...register("age", { valueAsNumber: true })}
                error={!!errors.age}
                helperText={errors.age?.message}
              />
            </div>
          )}

          {/* step 3  */}
          {step === 2 && (
            <div className="space-y-4">
              <TextField
                label="Mother's Name"
                id="mothersname"
                fullWidth
                sx={{ mb: 2 }}
                {...register("mothersName")}
                error={!!errors.mothersName}
                helperText={errors.mothersName?.message}
              />
              <TextField
                label="Father's Name"
                id="fathersname"
                fullWidth
                sx={{ mb: 2 }}
                {...register("fathersName")}
                error={!!errors.fathersName}
                helperText={errors.fathersName?.message}
              />
              <TextField
                label="AMKA"
                id="amka"
                fullWidth
                sx={{ mb: 2 }}
                {...register("amka")}
                error={!!errors.amka && touchedFields.amka}
                helperText={touchedFields.amka ? errors.amka?.message : ""}
              />
              <TextField
                label="VAT"
                id="vat"
                fullWidth
                sx={{ mb: 2 }}
                {...register("vat")}
                error={!!errors.vat && touchedFields.vat}
                helperText={touchedFields.vat ? errors.vat?.message : ""}
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

export default RegisterPage;
