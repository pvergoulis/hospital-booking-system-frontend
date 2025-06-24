import {
  isStepOneDisabled,
  isStepTwoDisabled,
  isStepThreeDisabled,
} from "../utils/createDoctorFormWatchUtils";
import { type doctorType } from "../types/doctorTypes";

// export const useDoctorStepValidation = (watchedValues: doctorType) => {
//   const isDisabledStepOne = isStepOneDisabled({
//     firstname: watchedValues.firstname ?? "",
//     lastname: watchedValues.lastname ?? "",
//     experience: watchedValues.experience ?? "",
//   });

//   const isDisabledStepTwo = isStepTwoDisabled({
//     image: watchedValues.image ?? "",
//     amka: watchedValues.amka ?? "",
//     cv: watchedValues.cv ?? "",
//   });

//   const isDisabledStepThree = isStepThreeDisabled({
//     specialization: watchedValues.specialization ?? { _id: "", name: "" },
//     clinic: watchedValues.clinic ?? { _id: "", name: "" },
//   });

//   return {
//     isDisabledStepOne,
//     isDisabledStepTwo,
//     isDisabledStepThree,
//   };
// };
export const useDoctorStepValidation = (watchedValues: doctorType) => {
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
  });

  return {
    isDisabledStepOne,
    isDisabledStepTwo,
    isDisabledStepThree,
  };
};