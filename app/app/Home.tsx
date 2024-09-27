"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import signupSchema from "@/form-validation-schema/signup";
import loginSchema from "@/form-validation-schema/login"; // Assuming loginSchema is defined similarly to signupSchema
import { useAuthEndpoints } from "@/hooks/useAuthEndpoints";
import { ClipLoader } from "react-spinners";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuthEndpoints();

  type FormData = {
    email: string;
    password: string;
    confirmPassword?: string;
  };

  const formOptions = {
    resolver: yupResolver(isRegisterMode ? signupSchema : loginSchema),
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    ...formOptions,
  });

  const showRegisterForm = () => {
    setIsRegisterMode(true);
  };

  const showLoginForm = () => {
    setIsRegisterMode(false);
  };

  const openLoginModal = () => {
    setIsModalOpen(true);
    showLoginForm();
  };

  const openRegisterModal = () => {
    setIsModalOpen(true);
    showRegisterForm();
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    setLoading(true);
    if (isRegisterMode) {
      signup(data, (status) => {
        setLoading(false);
        if (status) {
          reset();
        }
      });
    } else {
      login(data, (status) => {
        setLoading(false);
        if (status) {
          reset();
        }
      });
    }
  };

  return (
    <>
      <div className="h-screen items-center flex flex-col justify-center">
        <h1 className="mb-10 text-center max-w-[80%]">
          Welcome to John&apos;s map app
        </h1>
        <div className="flex flex-wrap gap-4">
          <button className="btn big-login" onClick={openLoginModal}>
            Log in
          </button>
          <button className="btn big-register" onClick={openRegisterModal}>
            Register
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog login animated">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  onClick={() => setIsModalOpen(false)}
                  aria-hidden="true"
                >
                  &times;
                </button>
                <h4 className="modal-title">
                  {isRegisterMode ? "Register with" : "Login with"}
                </h4>
              </div>
              <div className="modal-body">
                <div className="box">
                  <div className="content">
                    <div className="social">
                      <a className="circle github" href="#">
                        <i className="fa fa-github fa-fw"></i>
                      </a>
                      <a id="google_login" className="circle google" href="#">
                        <i className="fa fa-google-plus fa-fw"></i>
                      </a>
                      <a
                        id="facebook_login"
                        className="circle facebook"
                        href="#"
                      >
                        <i className="fa fa-facebook fa-fw"></i>
                      </a>
                    </div>
                    <div className="division">
                      <div className="line l"></div>
                      <span>or</span>
                      <div className="line r"></div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form">
                        <input
                          {...register("email")}
                          className="form-control"
                          type="text"
                          placeholder="Email"
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                        <input
                          {...register("password")}
                          className="form-control"
                          type="password"
                          placeholder="Password"
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                        {isRegisterMode && (
                          <>
                            <input
                              {...register("confirmPassword")}
                              className="form-control"
                              type="password"
                              placeholder="Repeat Password"
                            />
                            {errors.confirmPassword && (
                              <p>{errors.confirmPassword.message}</p>
                            )}
                          </>
                        )}
                        <button
                          disabled={loading}
                          type="submit"
                          className=" w-full py-[.5rem] flex items-center border justify-center gap-[1rem] btn-default"
                        >
                          <span>
                            {isRegisterMode ? "Create account" : "Login"}
                          </span>
                          {loading && <ClipLoader size={15} />}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                {isRegisterMode ? (
                  <div className="forgot register-footer">
                    <span>Already have an account?</span>{" "}
                    <button onClick={showLoginForm}>Login</button>
                  </div>
                ) : (
                  <div className="forgot login-footer">
                    <span>
                      Looking to{" "}
                      <button onClick={showRegisterForm}>
                        create an account
                      </button>
                      ?
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
