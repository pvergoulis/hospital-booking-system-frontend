
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
// import AdminDoctorPage from "./pages/AdminPages/AdminDoctorsPage";
import AdminDoctorPage from "./pages/AdminPages/AdminDoctorPages/AdminDoctorsPage";
// import AdminDoctorEditPage from "./pages/AdminPages/AdminDoctorEditPage";
import AdminDoctorEditPage from "./pages/AdminPages/AdminDoctorPages/AdminDoctorEditPage";
// import AdminDoctorCreatePage from "./pages/AdminPages/AdminDoctorCreatePage";
import AdminDoctorCreatePage from "./pages/AdminPages/AdminDoctorPages/AdminDoctorCreatePage";
// import AdminDoctorAppointmentsPage from "./pages/AdminPages/AdminDoctorAppointmentsPage";
import AdminDoctorAppointmentsPage from "./pages/AdminPages/AdminDoctorPages/AdminDoctorAppointmentsPage";
import AdminUserPage from "./pages/AdminPages/AdminUserPages/AdminUserPage";
import AdminAppointmentPage from "./pages/AdminPages/AdminAppointmentsPages/AdminAppointmentPage";
import AdminUserUpdatePage from "./pages/AdminPages/AdminUserPages/AdminUserUpdatePage";
import NoPermissionPage from "./pages/NoPermissionPage";
import RequireAdmin from "./components/RequireAdminComponent/RequireAdmin";
function App() {
 

  return (
    <>
      {/* <BrowserRouter>
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
            <Route path="/admin-user" element={<AdminUserPage/>} />
            <Route path="/update-user/:username" element={<AdminUserUpdatePage/>} />
          </Route>


        </Routes>
      </BrowserRouter> */}
       <BrowserRouter>
      <Routes>

        {/* 🔓 Public Routes */}
        <Route element={<BeforeLoginLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/*  Authenticated Layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/doctors" element={<DoctorPage />} />
          <Route path="/doctors/:lastname" element={<DoctorDetailsPage />} />
          <Route path="/myAppointments" element={<MyAppointmentsPage />} />
          <Route path="/about" element={<AboutPage />} />

          {/*  Route for non-admin access */}
          <Route path="/no-permission" element={<NoPermissionPage />} />

          {/*  Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminHomePage />
              </RequireAdmin>
            }
          />
          <Route
            path="/doctor-admin"
            element={
              <RequireAdmin>
                <AdminDoctorPage />
              </RequireAdmin>
            }
          />
          <Route
            path="/doctors/edit/:lastname"
            element={
              <RequireAdmin>
                <AdminDoctorEditPage />
              </RequireAdmin>
            }
          />
          <Route
            path="/doctor-create"
            element={
              <RequireAdmin>
                <AdminDoctorCreatePage />
              </RequireAdmin>
            }
          />
          <Route
            path="/doctor/appointments/:doctorId"
            element={
              <RequireAdmin>
                <AdminDoctorAppointmentsPage />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin-user"
            element={
              <RequireAdmin>
                <AdminUserPage />
              </RequireAdmin>
            }
          />
          <Route
            path="/update-user/:username"
            element={
              <RequireAdmin>
                <AdminUserUpdatePage />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin-appointments"
            element={
              <RequireAdmin>
                <AdminAppointmentPage />
              </RequireAdmin>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
