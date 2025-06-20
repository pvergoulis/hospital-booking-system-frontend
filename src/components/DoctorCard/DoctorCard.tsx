import { type doctorTypeCard } from "../../types/doctorTypes"


const DoctorCard = ({firstname, lastname , image, specialization, clinic}: doctorTypeCard) =>{
    return (
        <>
            <div className="w-70 h-85 rounded-2xl ms-24 shadow-xl/30 mt-4 mb-4">
                
                <div className=" rounded-2xl flex items-center  justify-center p-2 bg-sky-100">
                    <img src={image} alt="" className="w-40 h-40 rounded-full "/>
                </div>
                
                
                            <div className="space-y-6  ">
                                <p className="text-center text-2xl text-sky-500  mt-2 mb-2">{firstname} - {lastname}</p>
                                <p className="text-center text-xl text-gray-500 mb-2">{specialization.name}</p>
                                <p className="text-center text-xl text-gray-500 ">{clinic.name}</p>
                            </div>
                            
            </div>
        </>
    )
}

export default DoctorCard