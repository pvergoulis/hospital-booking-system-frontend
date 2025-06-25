import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import LoggedInHeader from "../LoggedInHeader/LoggedInHeader";

const DashboardLayout = () => {
  return (
    <>
      <LoggedInHeader />

      <div className="min-h-[55vh] ">
        <Outlet />
        
      </div>

      <Footer />
    </>
  );
};

export default DashboardLayout;
