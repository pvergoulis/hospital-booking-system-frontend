import { isStepOneDisabled, isStepTwoDisabled, isStepThreeDisabled } from "../utils/registerFormWatchUtils"
import { type userType } from "../types/userTypes"

export const useRegisterStepValidation = (watchedValues: Partial<userType>) => {
  const isDisabledStepOne = isStepOneDisabled({
    username: watchedValues.username ?? "",
    password: watchedValues.password ?? "",
    confirmPassword: watchedValues.confirmPassword ?? "",
    email: watchedValues.email ?? "",
  });

  const isDisabledStepTwo = isStepTwoDisabled({
    firstname: watchedValues.firstname ?? "",
    lastname: watchedValues.lastname ?? "",
    phone: watchedValues.phone ?? "",
    age: watchedValues.age ?? 0,
  });

  const isDisabledStepThree = isStepThreeDisabled({
    mothersName: watchedValues.mothersName ?? "",
    fathersName: watchedValues.fathersName ?? "",
    amka: watchedValues.amka ?? "",
    vat: watchedValues.vat ?? "",
  });

  return {
    isDisabledStepOne,
    isDisabledStepTwo,
    isDisabledStepThree,
  }
}
