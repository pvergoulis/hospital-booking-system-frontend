import { NavLink } from "react-router";

type AdminProps = {
  image: string;
  title: string;
  link: string;
  description: string;
};

const AdminFeatureCard = ({ image, title, link, description }: AdminProps) => {
  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center">
        <img
          src={image}
          alt={title}
          className="w-32 h-32 object-cover rounded-full border-4 border-blue-500 mb-4"
        />
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
          {title}
        </h2>
        <p className="text-gray-600 text-center mb-4">{description}</p>
        <NavLink
          to={link}
          className="mt-auto bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-xl transition duration-300"
        >
          Manage {title}
        </NavLink>
      </div>
    </>
  );
};

export default AdminFeatureCard;
