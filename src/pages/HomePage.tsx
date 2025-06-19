import { useEffect } from "react";
import Facilities from "../components/Facilities/Facilities";

const HomePage = () => {

    useEffect(()=>{
        document.title = "Parvathy Hospital | Home-Page"
    })

  return (
    <>
      <div className="">
        <div>
          <img src="./slide4.png" alt="" />
        </div>
        <div className="mt-4 md:flex  ">
          <Facilities
            image="hospital-bed.png"
            number="150+"
            text="Beds Facility"
          />
          <Facilities image="staff.png" number="500+" text="Trained Staff" />
          <Facilities image="doctors.png" number="150+" text="Doctors" />
          <Facilities
            image="specialities.png"
            number="35+"
            text="Specilalities"
          />
        </div>

        <div className="flex p-8 justify-around">
          <div className="w-250">
            <h1 className="text-red-500 text-5xl font-bold font-roboto">
              Why Choose
            </h1>
            <p className="  text-3xl font-semibold">
              Parvathy Multispeciality Hospital ?
            </p>
            <br />
            <p className="text-gray-600">
              Founded in 1992 by Dr. Muthukumar, Parvathy Hospital boasts 31
              years of unwavering commitment to excellence in healthcare and
              patient well-being.
            </p>
            <br />
            <p className="text-gray-600"> 
              From specializing in Orthopedics and preventive health to
              pioneering life-saving treatments and cutting-edge diagnostic
              services, Parvathy Multispeciality Hospital has positively
              impacted over 500,000 lives in India, the Middle East, and African
              countries, consistently delivering superior patient care outcomes.
            </p>
            <div className="md:flex  mt-12 justify-around">
                <div className=" w-40 mx-auto mt-4">
                    <img src="/img-1.png" alt="" className="ms-10 mb-2 w-20"/>
                    <div className="w-50">
                        <p className="font-semibold">Accredited By National Accreditation Board for Hospitals (NABH) - For Top Quality Patient Care</p>
                    </div> 
                </div>

                <div className=" w-40 mx-auto mt-4">
                    <img src="/img-2.png" alt="" className="ms-10 mb-2 w-20"/>
                    <div className="w-50">
                        <p className="font-semibold">Accredited By National Accreditation Board for Hospitals (NABH) - For Nursing Excellence</p>
                    </div> 
                </div>

                <div className=" w-40 mx-auto mt-4">
                    <img src="/img-3.png" alt="" className="ms-10 mb-2 w-20"/>
                    <div className="w-50">
                        <p className="font-semibold">Empaneled With Central Government Health Scheme (CGHS) - Reduced Treatment Fee For Central Gov. Employees, Pensioners and Their Dependents.</p>
                    </div> 
                </div>
                
            </div>
          </div>
          
          <div>
            <img src="/doctor-01.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
