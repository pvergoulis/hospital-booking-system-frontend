import {
  isStepOneDisabled,
  isStepTwoDisabled,
  isStepThreeDisabled,
} from "../utils/createDoctorFormWatchUtils";
import { type doctorCreateType } from "../types/doctorTypes";

export const useDoctorStepValidation = (watchedValues: doctorCreateType ) => {
  const isDisabledStepOne = isStepOneDisabled({
    firstname: watchedValues.firstname ?? "",
    lastname: watchedValues.lastname ?? "",
    experience: watchedValues.experience ?? "",
  });

  const isDisabledStepTwo = isStepTwoDisabled({
    image: watchedValues.image ?? "",
    amka: watchedValues.amka ?? "",
    cv: watchedValues.cv ?? "",
  });


  const isDisabledStepThree = isStepThreeDisabled({
    specialization: watchedValues.specialization ?? { _id: "", name: "" },
    clinic: watchedValues.clinic ?? { _id: "", name: "" },
    email: watchedValues.email ?? "",
    username: watchedValues.username ?? "",
    password: watchedValues.password ?? "",
  });

  return {
    isDisabledStepOne,
    isDisabledStepTwo,
    isDisabledStepThree,
  };
};