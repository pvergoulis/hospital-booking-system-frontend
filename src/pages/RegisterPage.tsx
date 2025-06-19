import { Container, Typography, Button, TextField } from "@mui/material";
import StepperWizzard from "../components/Stepper/StepperWizzard";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type userType } from "../types/userTypes";
import { usePasswordToggle } from "../hooks/usePasswordToggle";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";
import {
  isStepOneDisabled,
  isStepTwoDisabled,
  isStepThreeDisabled,
} from "../utils/registerFormWatchUtils";
import { registerUser } from "../services/userApi";
import { useNavigate } from "react-router";

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

  const isDisabledStepOne = isStepOneDisabled({
    username: watchedValues.username ?? "",
    password: watchedValues.password ?? "",
    confirmPassword: watchedValues.confirmPassword ?? "",
    email: watchedValues.email ?? "",
  });

  const isDisabledStepTwo = isStepTwoDisabled({
    firstname: watchedValues.firstname ?? "",
    lastname: watchedValues.lastname ?? "",
    phone: watchedValues.phone ?? "",
    age: watchedValues.age ?? 0,
  });

  const isDisabledStepThree = isStepThreeDisabled({
    mothersName: watchedValues.mothersName ?? "",
    fathersName: watchedValues.fathersName ?? "",
    amka: watchedValues.amka ?? "",
    vat: watchedValues.vat ?? "",
  });

  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const nextStep = () => {
    if (step < 2) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  const { showPassword, togglePassword } = usePasswordToggle();


  const [registerMessage, setRegisterMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const onSubmit = async (data: userType) => {
    console.log("Submitted data", data);
    try {
      await registerUser(data);
      setRegisterMessage(" Success Registration");
      setIsSuccess(true);
      console.log("User registered successfully:");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error) {
      console.log("Error in creating new user", error);
      setRegisterMessage(" Failed in creating new user");
      setIsSuccess(false);
    }
  };

  
  return (
    <>
      <Container className="mt-16 border-3 border-blue-400 rounded-xl space-y-7 pb-6  mb-6 min-h-[55vh]">
        <StepperWizzard step={step} />
        {registerMessage && (
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: isSuccess ? "green" : "red",
              fontSize: "1.2rem",
            }}
          >
            {registerMessage}
          </Typography>
        )}
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
