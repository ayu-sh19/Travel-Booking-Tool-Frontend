import React, { useId } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { login as authLogin } from "../store/authSlice";
import authService from "../appwrite/auth";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const id = useId();

  const loginHandler = async (data) => {
    setLoading(true);
    try {
      const session = await authService.login(data);
      console.log(session);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/search");
      }
    } catch (error) {
      throw error.message;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex fixed overflow-hidden items-center justify-center w-full bg-[url('./assets/desert.jpg')] bg-cover"
      style={{
        minHeight: "100vh",
      }}
    >
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl mb-25 p-10 border border-black/10 dark:bg-gray-900`}
      >
        <h2 className="text-center dark:text-white text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <form onSubmit={handleSubmit(loginHandler)} className="mt-8">
          <div className="space-y-5">
            <label className="inline-block mb-1 pl-1 dark:text-white" htmlFor={id}>
              Email:
            </label>
            <input
              placeholder="Enter your email"
              type="email"
              className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <label className="inline-block mb-1 pl-1 dark:text-white" htmlFor={id}>
              Password
            </label>
            <input
              label="Password::"
              placeholder="Enter your password"
              type="password"
              className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
              {...register("password", {
                required: true,
              })}
            />
            {/* <Button type="submit" className="w-full">
              Sign In
            </Button> */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              style={{ width: "100px", height: "40px" }}
            >
              {loading ? (
                <div className="flex items-center gap-1">
                  <CircularProgress size={18} />
                  {/* <h4 className="text">Loading</h4> */}
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
