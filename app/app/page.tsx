"use client";

import React, { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showRegisterForm = () => {
    setIsRegisterMode(true);
    setErrorMessage("");
  };

  const showLoginForm = () => {
    setIsRegisterMode(false);
    setErrorMessage("");
  };

  const openLoginModal = () => {
    setIsModalOpen(true);
    showLoginForm();
  };

  const openRegisterModal = () => {
    setIsModalOpen(true);
    showRegisterForm();
  };

  const loginAjax = () => {
    shakeModal();
  };

  const shakeModal = () => {
    setErrorMessage("Invalid email/password combination");
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
                    {errorMessage && (
                      <div className="error alert alert-danger">
                        {errorMessage}
                      </div>
                    )}
                    {isRegisterMode ? (
                      <div className="form registerBox">
                        <form
                          method=""
                          action=""
                          accept-charset="UTF-8"
                          encType="multipart/form-data"
                          data-remote="true"
                        >
                          <input
                            id="email"
                            className="form-control"
                            type="text"
                            placeholder="Email"
                            name="email"
                          />
                          <input
                            id="password"
                            className="form-control"
                            type="password"
                            placeholder="Password"
                            name="password"
                          />
                          <input
                            id="password_confirmation"
                            className="form-control"
                            type="password"
                            placeholder="Repeat Password"
                            name="password_confirmation"
                          />
                          <button className="btn btn-default btn-register">
                            Create account
                          </button>
                        </form>
                      </div>
                    ) : (
                      <div className="form loginBox">
                        <form method="" action="" accept-charset="UTF-8">
                          <input
                            id="email"
                            className="form-control"
                            type="text"
                            placeholder="Email"
                            name="email"
                          />
                          <input
                            id="password"
                            className="form-control"
                            type="password"
                            placeholder="Password"
                            name="password"
                          />
                          <button
                            type="button"
                            className="btn btn-default btn-login"
                            onClick={loginAjax}
                          >
                            Login
                          </button>
                        </form>
                      </div>
                    )}
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
