import { useEffect } from "react";

const AboutPage = () => {
    useEffect(()=>{
        document.title = "Parvathy Hospital | About Page";
    },[])

  return (
    <>
      <div className="mt-[-5px]">
        <img
          src="banner-1.jpg"
          alt="Hospital Banner"
          className="w-full max-h-100 object-cover rounded-lg shadow-md"
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-6 mt-8 px-4 max-w-7xl mx-auto mb-16">
        <div className="border-2 border-blue-500 rounded-lg p-6 flex-1 bg-blue-50 shadow-sm">
          <h2 className="text-center font-semibold text-xl mb-4">Overview</h2>
          <p className="text-center text-gray-700 leading-relaxed font-medium">
            Parvathy Hospital is a prominent multi-specialty healthcare
            institution located in Chennai, India. Established in 1992 by Dr. S.
            Muthukumar, a renowned orthopedic surgeon, the hospital has earned a
            reputation for excellence in patient care and medical innovation.
          </p>
        </div>

        <div className="border-2 border-blue-500 rounded-lg p-6 flex-1 bg-blue-50 shadow-sm">
          <h2 className="text-center font-semibold text-xl mb-4">
            Accreditations & Achievements
          </h2>
          <p className="text-gray-700 leading-relaxed font-medium">
            The hospital is accredited by the National Accreditation Board for
            Hospitals & Healthcare Providers (NABH), reflecting its commitment
            to quality and patient safety. Notably, Parvathy Hospital is the
            eighth in the world to introduce the Intra-Operative CT system,
            known as the Intelligent Operating Room (IOR), enhancing precision
            in brain, spine, and bone surgeries.
          </p>
        </div>

        <div className="border-2 border-blue-500 rounded-lg p-6 flex-1 bg-blue-50 shadow-sm">
          <h2 className="text-center font-semibold text-xl mb-4">
            International Patient Care
          </h2>
          <p className="text-gray-700 leading-relaxed font-medium">
            Parvathy Hospital caters to international patients by offering
            comprehensive services such as airport pickup, accommodation
            arrangements, telemedicine consultations, and post-operative care,
            ensuring a seamless healthcare experience .
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
