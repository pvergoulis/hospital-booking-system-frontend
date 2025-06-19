import { type userType } from "../types/userTypes";


type StepOneFields = Pick<userType, "username" | "password" | "confirmPassword" | "email">;
type StepTwoFields = Pick<userType, "firstname" | "lastname" | "phone" | "age">;
type StepThreeFields = Pick<userType, "mothersName" | "fathersName" | "amka" | "vat">;


export const isStepOneDisabled = ({ username, password, confirmPassword, email }: StepOneFields) =>
  username.trim() === "" ||
  username.length < 3 ||
  password.trim() === "" ||
  password !== confirmPassword ||
  email.trim() === "";

export const isStepTwoDisabled = ({ firstname, lastname, phone, age }: StepTwoFields) =>
  firstname.trim() === "" ||
  lastname.trim() === "" ||
  phone.trim() === "" ||
  age < 1;

export const isStepThreeDisabled = ({ mothersName, fathersName, amka, vat }: StepThreeFields) =>
  !mothersName || mothersName.trim() === "" ||
  !fathersName || fathersName.trim() === "" ||
  amka.trim().length !== 11 ||
  vat.trim().length !== 9;