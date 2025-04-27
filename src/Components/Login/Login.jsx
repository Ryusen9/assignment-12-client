import Lottie from "lottie-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom"; // 👈 for navigation
import { Helmet } from "react-helmet";
import {
  FaGoogle,
  FaGithub,
  FaFacebookF,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa"; // 👈 icons
import animationData from "/public/Lottie/login animation.json";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <>
      <Helmet>
        <title>BloodBond | Login</title>
        <meta name="description" content="Login to BloodBond" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center p-4 bg-base-200">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Animation */}
          <div>
            <Lottie animationData={animationData} loop={true} />
          </div>

          {/* Login Form */}
          <div className="card w-full shadow-2xl bg-base-100 p-8">
            <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                />
                {errors.email && (
                  <p className="text-error text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Minimum 6 characters" },
                    })}
                    placeholder="Enter your password"
                    className="input input-bordered w-full pr-12"
                  />
                  <div
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-error text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary w-full">
                  Login
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="divider">OR</div>

            {/* Social Login Buttons */}
            <div className="flex justify-center gap-6 mb-4">
              <button className="btn btn-outline btn-circle text-xl">
                <FaGoogle />
              </button>
              <button className="btn btn-outline btn-circle text-xl">
                <FaGithub />
              </button>
              <button className="btn btn-outline btn-circle text-xl">
                <FaFacebookF />
              </button>
            </div>

            {/* Link to Register */}
            <p className="text-center">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-rose-600 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
