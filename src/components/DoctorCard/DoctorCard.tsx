import { type doctorTypeCard } from "../../types/doctorTypes";

const DoctorCard = ({ firstname, lastname, image, specialization, clinic }: doctorTypeCard) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 flex flex-col items-center text-center border-2 border-sky-200">
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-sky-200 mb-4">
        <img src={image} alt={`${firstname} ${lastname}`} className="w-full h-full object-cover" />
      </div>
      <h2 className="text-xl font-semibold text-sky-600">{firstname} {lastname}</h2>
      <p className="text-sm text-gray-500 mt-1">{specialization.name}</p>
      <p className="text-sm text-gray-400">{clinic.name}</p>
    </div>
  );
};

export default DoctorCard;
