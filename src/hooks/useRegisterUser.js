import { useMutation } from "@tanstack/react-query";
import api from "../utils/api";
const registerUser = async (userData) => {
  const response = await api.post("/user", userData);
  return response.data;
};

export const useRegisterUser = () => {
  return useMutation(registerUser);
};
