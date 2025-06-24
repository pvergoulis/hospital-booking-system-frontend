import { type doctorType } from "../types/doctorTypes";


type StepOneFields = Pick<doctorType, "firstname" | "lastname" | "experience">;
type StepTwoFields = Pick<doctorType, "image" | "amka" | "cv">;
type StepThreeFields = Pick<doctorType, "specialization" | "clinic">;


export const isStepOneDisabled = ({firstname,lastname,experience }: StepOneFields) =>
  firstname.trim() === "" ||
  firstname.length < 3 ||
  lastname.trim() === "" ||
  lastname.length < 3 ||
  experience?.trim() === "";


export const isStepTwoDisabled = ({ image, amka, cv }: StepTwoFields) =>
  image?.trim() === "" ||
  amka.trim().length !== 11 ||
  !cv || cv.trim() === "" || cv.length > 15;

export const isStepThreeDisabled = ({ specialization, clinic }: StepThreeFields) =>
  !specialization || !specialization._id || specialization._id.trim() === "" ||
  !clinic || !clinic._id || clinic._id.trim() === "";