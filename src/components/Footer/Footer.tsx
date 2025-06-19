import { Phone } from "lucide-react";
import { MapPin } from "lucide-react";
import { Mail } from 'lucide-react';

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-500 md:flex justify-center items-center ">
        

        
        <div className="space-y-4 mx-auto ">
          <img src="/logo4.png" alt="" className="w-50 text-white ms-28 lg:ms-0" />
            <p className="text-white text-xl ms-28 lg:ms-0 ">
                  Phone:  <br />
              <span className=" font-bold  flex gap-4 mt-2  ">
                <span >
                  <Phone />
                </span>
                2106488236
              </span>
            </p>

            <p className="text-white text-xl ms-28 lg:ms-0">
                   Email:  <br />
              <span className=" font-bold  flex gap-4 mt-2 ">
                <span>
                  <Mail />
                </span>
                parvHospital@gmail.com
              </span>
            </p>
        </div>
        <div className="lg:mx-auto mt-12">
          <img src="espa_covid19.png" alt="" className=" w-90 mx-auto"/>
        </div>
        <div className=" mt-4 p-4 lg:mx-auto ">
         

         
            <p className="flex mt-4 mb-4 text-white ms-26 lg:ms-4" >
                 <span className="me-2">
                <MapPin />
              </span>{" "}
             Location Parvathy Hospital
            </p>
            
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1111.6985940052944!2d23.768774148412657!3d37.992098634238815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a198069d4d81a1%3A0xaa931ba86bbfc79f!2sGeneral%20Hospital%20of%20Athens%20Korgialeneio%20-%20Benakeio%20Hellenic%20Red%20Cross!5e0!3m2!1sen!2sgr!4v1749128304290!5m2!1sen!2sgr"
              width="250"
              height="200"
              className="mx-auto"
            ></iframe>
          </div>

      
      </footer>
        <div className="bg-gray-800 text-white  ">
          <p className=" text-center">
            &copy; 2025  Parvathy Hospital
          </p>
        </div>
    </>
  );
};

export default Footer;
