import { useEffect} from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {  Visibility, VisibilityOff } from "@mui/icons-material"
import { InputAdornment, IconButton } from "@mui/material";
import { Link } from "react-router";
import { userLoginSchema, type userLoginType } from "../types/userTypes";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import { usePasswordToggle } from "../hooks/usePasswordToggle";

const initialValues = {
  username : "",
  password : ""
}


const LoginPage = () => {
  useEffect(() => {
    document.title = "Parvathy Hospital | Login Page";
  }, []);


  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
    watch,
  } = useForm<userLoginType>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: initialValues
  })

  const username = watch("username")
  const password = watch("password")
  const isDisabled = username.trim() === "" || username.length < 3 || password.trim() === ""



const { showPassword, togglePassword } = usePasswordToggle();


  const onSubmit =(data : userLoginType)=>{
    console.log("data", data);
    reset()
  }

  return (
    <>
    
      <Container
        maxWidth="sm"
        sx={{
          mt:15,
          border: "2px solid #2461f0",
          borderRadius: "10px",
          p: 4,
          mb: 6
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{
            textAlign: "center",
            color: "#2461f0",
            fontSize: "1.8rem",
            fontWeight: "semi-bold",
            fontFamily: "roboto",
            mb: "2rem",
            offset: "3px"
          }}
        >
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            placeholder="Enter Username"
            fullWidth
            required
            id="username"
            label="Username"
            autoFocus
            {...register("username")}
            
            sx={{ mb: 2 }}
            error={!!errors.username}
            helperText={errors.username?.message}
            FormHelperTextProps={{
              sx: {
                color: "#d32f2f",
                fontWeight: "bold",
              },
            }}
          />

          <TextField
            placeholder="Enter Password"
            fullWidth
            required
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            sx={{ mb: 2 }}
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            
            FormHelperTextProps={{
              sx: {
                color: "#d32f2f",
                fontWeight: "bold",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 1 }}
            disabled={isDisabled}
          >
            Submit
          </Button>
        </Box>
        <Grid container justifyContent="space-between" sx={{ m: 1 }}>
          <Typography sx={{ mt: 2, color: "#2461f0", fontSize: "1rem" }}>
            Dont you have an account?
            <Link
              to="/register"
              className="underline underline-offset-5 text-md font-bold text-blue-500 mt-2 ps-2"
            >
              Sign up Here
            </Link>
          </Typography>
        </Grid>
      </Container>
    
    </>
  );
};

export default LoginPage;