import { type doctorCreateType  } from "../types/doctorTypes";


type StepOneFields = Pick<doctorCreateType , "firstname" | "lastname" | "experience">;
type StepTwoFields = Pick<doctorCreateType , "image" | "amka" | "cv">;
type StepThreeFields = Pick<doctorCreateType , "specialization" | "clinic">;


export const isStepOneDisabled = ({ firstname, lastname, experience }: StepOneFields) =>
  !firstname || firstname.trim().length < 3 ||
  !lastname || lastname.trim().length < 3 ||
  !experience || experience.trim() === "";

export const isStepTwoDisabled = ({ image, amka, cv }: StepTwoFields) =>
  !image || image.trim() === "" ||
  !amka || amka.trim().length !== 11 ||
  !cv || cv.trim() === "";

export const isStepThreeDisabled = ({ specialization, clinic }: StepThreeFields) =>
  !specialization || !specialization._id || specialization._id.trim() === "" ||
  !clinic || !clinic._id || clinic._id.trim() === "";