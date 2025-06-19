import { useState } from "react";

export const useFormField = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setTouched(true);
  };

  const hasError = touched && value.trim() === "";
  const helperText = hasError ? "This field is required" : "";

  return {
    value,
    onChange,
    onBlur,
    hasError,
    helperText,
  };
};