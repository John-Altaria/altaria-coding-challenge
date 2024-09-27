import axios, { AxiosError } from "axios";
import { ISignUpPayload } from "@/types/api";
import { toast } from "react-hot-toast";

export const useAuthEndpoints = () => {
  const signup = async (
    data: ISignUpPayload,
    callback: (status: boolean) => void
  ) => {
    toast.promise(axios.post("/api/auth/signup", data), {
      loading: "Signing up...",
      success: "User signed up successfully!",
      error: (error) => {
        const err: AxiosError<{ message: string }> = error;
        if (callback) {
          callback(false);
        }
        return err?.response?.data?.message || "An error occurred!";
      },
    });
  };

  const login = async (
    data: ISignUpPayload,
    callback: (status: boolean) => void
  ) => {
    toast.promise(axios.post("/api/auth/login", data), {
      loading: "Logging in...",
      success: "Login successful!",
      error: (error) => {
        const err: AxiosError<{ message: string }> = error;
        if (callback) {
          callback(false);
        }
        return err?.response?.data?.message || "An error occurred!";
      },
    });
  };

  return { signup, login };
};
