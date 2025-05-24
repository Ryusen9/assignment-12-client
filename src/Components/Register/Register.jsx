import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import animationData from "/public/Lottie/login animation.json";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Context from "../../Context/Context";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const password = watch("password");

  const { createUser } = useContext(Context);

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  // States for show/hide password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleImageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    const res = await axios.post(image_hosting_api, formData);
    return res.data.data.url;
  };

  const onSubmit = async (data) => {
    try {
      const file = data.profilePicture[0];
      const imageURL = await handleImageUpload(file);

      const newUser = {
        name: data.name,
        email: data.email,
        profilePicture: imageURL,
        createdAt: new Date(),
        role: "user",
      };

      await createUser(data.email, data.password);

      await axios
        .post("http://localhost:5000/users", newUser, { withCredentials: true })
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Registration Successful",
              text: `${data.name}, you have successfully registered!`,
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              reset();
              navigate("/");
            });
          }
        });
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>BloodBond | Register</title>
        <meta name="description" content="Register to BloodBond" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center p-4 bg-base-200">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Animation */}
          <div>
            <Lottie animationData={animationData} loop={true} />
          </div>

          {/* Form */}
          <div className="card w-full shadow-2xl bg-base-100 p-8">
            <h2 className="text-3xl font-bold text-center mb-6">
              Register Yourself
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* Username */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                />
                {errors.name && (
                  <p className="text-error text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

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
                    placeholder="Enter password"
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

              {/* Confirm Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    placeholder="Confirm your password"
                    className="input input-bordered w-full pr-12"
                  />
                  <div
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                {errors.confirmPassword && (
                  <p className="text-error text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Upload Profile Picture */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Profile Picture</span>
                </label>
                <input
                  type="file"
                  {...register("profilePicture", {
                    required: "Profile picture is required",
                  })}
                  className="file-input file-input-bordered w-full"
                />
                {errors.profilePicture && (
                  <p className="text-error text-sm mt-1">
                    {errors.profilePicture.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary w-full">
                  Register
                </button>
              </div>
            </form>
            <div className="divider"></div>
            <div className="text-center">
              <p className="text-sm">
                Already have an account?{" "}
                <Link to={"/login"}>
                  <span href="/login" className="link text-rose-600">
                    Login here
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
