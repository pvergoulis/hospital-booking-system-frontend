
import {BrowserRouter, Route, Routes} from "react-router";
import BeforeLoginLayout from "./components/BeforeLoginLayout/BeforeLoginLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WelcomePage from "./pages/WelcomePage";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import DoctorPage from "./pages/DoctorsPage";
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
          </Route>


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
