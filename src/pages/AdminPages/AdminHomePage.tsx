import AdminFeatureCard from "../../components/AdminFeatureCard/AdminFeatureCard";

const AdminHomePage = () => {
 
  return (
    <>
      <div className="p-10 min-h-[60vh] bg-gray-50 mt-8">
        <h1 className="text-3xl font-bold text-center mb-10 text-blue-600">
          Admin Dashboard
        </h1>
       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AdminFeatureCard title="Doctors" image="/doctor-admin.avif" link="/doctor-admin" description= "Manage all registered doctors: add new doctors, edit their profiles, or remove them. Monitor their availability and medical specialties."
/>
        <AdminFeatureCard title="Users" image="/user.jpg" link="/admin-user" description= "View and manage user accounts: access patient profiles, update user information, and ensure a smooth user experience across the platform."/>
        <AdminFeatureCard title="Appointments" image="/book.avif" link="/admin-appointments" description="Access and manage all appointments between doctors and users. View upcoming visits"/>
        </div>
      </div>
    </>
  );
};

export default AdminHomePage;
