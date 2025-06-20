import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import LoggedInHeader from "../LoggedInHeader/LoggedInHeader";

const DashboardLayout = () => {
  return (
    <>
      <LoggedInHeader />

      <div className="min-h-[55vh] pt-16">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default DashboardLayout;
