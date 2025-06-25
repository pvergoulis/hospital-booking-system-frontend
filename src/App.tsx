
import {BrowserRouter, Route, Routes} from "react-router";
import BeforeLoginLayout from "./components/BeforeLoginLayout/BeforeLoginLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WelcomePage from "./pages/WelcomePage";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import DoctorPage from "./pages/DoctorsPage";
import DoctorDetailsPage from "./pages/DoctorDetailsPage"
import MyAppointmentsPage from "./pages/MyAppointmentsPage";
import AboutPage from "./pages/AboutPage";
import AdminHomePage from "./pages/AdminPages/AdminHomePage";
import AdminDoctorPage from "./pages/AdminPages/AdminDoctorsPage";
import AdminDoctorEditPage from "./pages/AdminPages/AdminDoctorEditPage";
import AdminDoctorCreatePage from "./pages/AdminPages/AdminDoctorCreatePage";
import AdminDoctorAppointmentsPage from "./pages/AdminPages/AdminDoctorAppointmentsPage";
import AdminAppointmentPage from "./pages/AdminPages/AdminAppointmentsPages/AdminAppointmentPage";
function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={<BeforeLoginLayout/>}>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
          </Route>


          <Route element={<DashboardLayout/>}>
            <Route path="/welcome" element={<WelcomePage/>}/>
            <Route path="/doctors" element={<DoctorPage/>}/>
            <Route path="/doctors/:lastname" element={<DoctorDetailsPage />} />
            <Route path="/myAppointments" element={<MyAppointmentsPage/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path ="admin" element={<AdminHomePage/>}/>
            <Route path="/doctor-admin" element={<AdminDoctorPage/>}/>
            <Route path="/doctors/edit/:lastname" element={<AdminDoctorEditPage />} />
            <Route path="/doctor-create" element={<AdminDoctorCreatePage/>}/>
            <Route path="/doctor/appointments/:doctorId" element={<AdminDoctorAppointmentsPage/>}/>
            <Route path="/admin-appointments" element={<AdminAppointmentPage/>}/>
          </Route>


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
