import { useState } from "react";

export const usePasswordToggle = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);
  return { showPassword, togglePassword };
};