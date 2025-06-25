export type AppointmentRequest = {
  doctorId: string;
  date: string; 
  timeSlot: string; 
};


export type AppointmentType = {
  _id: string;
  date: string;
  timeSlot: string;
  status: string;
  doctor: {
    _id: string;
    firstname: string;
    lastname: string;
    specialization: {
      name: string;
    };
    image?: string;
  };
  
};


export type AppointmentDoctorType = {
  _id: string;
  date: string;
  timeSlot: string;
  status: string;
  doctor: {
    _id: string;
    firstname: string;
    lastname: string;
    specialization: {
      name: string;
    };
    image?: string;
  };
  user: {
    _id: string;
    firstname: string;
    lastname: string;
  };
}