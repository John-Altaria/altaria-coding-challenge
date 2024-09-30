import axios, { AxiosError } from "axios";
import {
  INextResponse,
  IResponse,
  ISignUpPayload,
  IUserResponseType,
} from "@/types/api";
import { toast } from "react-hot-toast";
import { authStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import toastTheme from "@/helpers/toastTheme";

export const useAuthEndpoints = () => {
  const setSession = authStore((state) => state.setSession);
  const { replace } = useRouter();

  const signup = async (
    data: ISignUpPayload,
    callback: (status: boolean) => void
  ) => {
    toast.promise(
      axios.post("/api/auth/signup", data),
      {
        loading: "Signing up...",
        success: () => {
          if (callback) {
            callback(true);
          }
          return "Sign up successful, login";
        },
        error: (error) => {
          const err: AxiosError<{ message: string }> = error;
          if (callback) {
            callback(false);
          }
          if (err?.response?.status === 401) {
            replace("/");
          }
          return err?.response?.data?.message || "An error occurred!";
        },
      },
      { ...toastTheme }
    );
  };

  const login = async (
    data: ISignUpPayload,
    callback: (status: boolean) => void
  ) => {
    toast.promise(
      axios.post("/api/auth", data),

      {
        loading: "Logging in...",
        success: (response) => {
          if (callback) {
            callback(true);
          }
          const data: INextResponse<IResponse<IUserResponseType>> =
            response.data;
          setSession(data.response.data);
          replace("/dashboard");

          return "Login successful!";
        },
        error: (error) => {
          const err: AxiosError<{ message: string }> = error;
          if (callback) {
            callback(false);
          }
          if (err?.response?.status === 401) {
            replace("/");
          }
          return err?.response?.data?.message || "An error occurred!";
        },
      },
      { ...toastTheme }
    );
  };

  return { signup, login };
};
