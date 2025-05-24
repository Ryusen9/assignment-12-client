import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Context from "../../Context/Context";
const RegisterFormHome = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const { user } = useContext(Context);

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  useEffect(() => {
    axios.get("/districts.json").then((res) => setDistricts(res.data));
    axios.get("/upazilas.json").then((res) => {
      const sortedUpazilas = res.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setUpazilas(sortedUpazilas);
    });
  }, []);
  const handleImageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    const res = await axios.post(image_hosting_api, formData);
    return res.data.data.url;
  };

  const onSubmit = async (data) => {
    const file = data.photo[0];
    const imageURL = await handleImageUpload(file);
    const newVolunteer = {
      name: data.name,
      email: data.email,
      photo: imageURL,
      age: data.age,
      bloodGroup: data.bloodGroup,
      profession: data.profession,
      contact: data.contact,
      address: data.address,
      gender: data.gender,
      district: data.district,
      upazila: data.upazila,
      role: "volunteer",
    };

    // Send the new volunteer data to the server
    await axios
      .post("https://server-theta-virid.vercel.app/volunteers", newVolunteer)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Registration Successful",
            text: `${data.name}, you have successfully registered!`,
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            reset();
          });
        }
      });
  };

  return (
    <div
      id="volunteer-form"
      className="max-w-7xl my-5 mx-auto flex items-center justify-center p-5"
    >
      <div className="flex flex-col gap-5 w-full">
        <p className="text-xl md:text-2xl lg:text-4xl font-bold">
          Register Yourself As a Volunteer
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Username field */}
          <div className="w-full">
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                className={`w-full ${errors.name ? "border-red-500" : ""}`}
                type="text"
                placeholder="Username"
                title="Only letters, numbers or dash"
                {...register("name", {
                  required: true,
                  pattern: /^[A-Za-z][A-Za-z0-9\-]*$/,
                  minLength: 3,
                  maxLength: 30,
                })}
              />
            </label>

            {/* Error messages for Username */}
            {errors.name?.type === "required" && (
              <p className="mt-1 text-red-500">Username is required</p>
            )}
            {errors.name?.type === "pattern" && (
              <p className="mt-1 text-red-500">
                Username must start with a letter and can only contain letters,
                numbers, or dashes
              </p>
            )}
            {errors.name?.type === "minLength" && (
              <p className="mt-1 text-red-500">
                Username must be at least 3 characters
              </p>
            )}
            {errors.name?.type === "maxLength" && (
              <p className="mt-1 text-red-500">
                Username must not exceed 30 characters
              </p>
            )}
          </div>

          {/* Email field */}
          <div className="w-full">
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                readOnly
                className={`w-full ${errors.email ? "border-red-500" : ""}`}
                type="email"
                defaultValue={user?.email}
                {...register("email", {
                  required: true,
                  pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                })}
              />
            </label>
          </div>

          {/* Photo field */}
          <div className="md:col-span-2 w-full">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Upload your profile photo
              </legend>
              <input
                type="file"
                className="file-input"
                {...register("photo", { required: true })}
              />
            </fieldset>

            {/* Error messages for Photo */}
            {errors.photo?.type === "required" && (
              <div className="mt-1 text-red-500">Photo is required</div>
            )}
          </div>

          {/* Age field */}
          <div className="">
            <label htmlFor="age" className="flex flex-col gap-1 w-full">
              <input
                type="number"
                {...register("age", { required: true })}
                placeholder="Enter your age"
                className="input w-full"
              />
            </label>
            {errors.age && (
              <p className="mt-1 text-red-500">Please enter your age</p>
            )}
          </div>

          {/* Blood Group Field */}
          <div className="w-full">
            <label className="input validator flex items-center gap-2">
              {/* Optional: Blood drop SVG Icon */}
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2C8.5 7.5 4 11.5 4 16a8 8 0 0016 0c0-4.5-4.5-8.5-8-14z" />
              </svg>

              {/* Select Input */}
              <select
                className="w-full bg-transparent focus:outline-none"
                defaultValue=""
                {...register("bloodGroup", { required: true })}
              >
                <option value="" disabled>
                  Select Blood Group
                </option>
                <option className="text-rose-600 font-medium" value="A+">
                  A+
                </option>
                <option className="text-rose-600 font-medium" value="A-">
                  A-
                </option>
                <option className="text-rose-600 font-medium" value="B+">
                  B+
                </option>
                <option className="text-rose-600 font-medium" value="B-">
                  B-
                </option>
                <option className="text-rose-600 font-medium" value="O+">
                  O+
                </option>
                <option className="text-rose-600 font-medium" value="O-">
                  O-
                </option>
                <option className="text-rose-600 font-medium" value="AB+">
                  AB+
                </option>
                <option className="text-rose-600 font-medium" value="AB-">
                  AB-
                </option>
              </select>
            </label>

            {/* Error message */}
            {errors.bloodGroup && (
              <p className="mt-1 text-red-500">
                Please select your blood group
              </p>
            )}
          </div>

          {/* Profession Field */}
          <div className="w-full">
            <label className="input validator flex items-center gap-2">
              {/* Profession Icon */}
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 7v-5m0-5v5"
                />
              </svg>

              <input
                className="w-full bg-transparent focus:outline-none"
                type="text"
                placeholder="Profession"
                {...register("profession", { required: true, maxLength: 50 })}
              />
            </label>
            {errors.profession && (
              <p className="mt-1 text-red-500">Please enter your profession</p>
            )}
          </div>

          {/* Contact Number Field */}
          <div className="w-full">
            <label className="input validator flex items-center gap-2">
              {/* Phone Icon */}
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.586a1 1 0 01.707.293l2.414 2.414a1 1 0 010 1.414L9 10l5 5 2.879-2.879a1 1 0 011.414 0l2.414 2.414a1 1 0 01.293.707V19a2 2 0 01-2 2h-2c-6.627 0-12-5.373-12-12V7a2 2 0 012-2z"
                />
              </svg>

              <input
                className="w-full bg-transparent focus:outline-none"
                type="tel"
                placeholder="Contact Number"
                {...register("contact", {
                  required: true,
                  pattern: /^[0-9]{10,15}$/,
                })}
              />
            </label>
            {errors.contact && (
              <p className="mt-1 text-red-500">Enter a valid contact number</p>
            )}
          </div>

          {/* Address Field */}
          <div className="w-full">
            <label className="input validator flex items-center gap-2">
              {/* Location Icon */}
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 12.414a4 4 0 10-5.657 5.657l4.243 4.243a4 4 0 005.657-5.657z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <input
                className="w-full bg-transparent focus:outline-none"
                type="text"
                placeholder="Address"
                {...register("address", { required: true })}
              />
            </label>
            {errors.address && (
              <p className="mt-1 text-red-500">Please enter your address</p>
            )}
          </div>
          {/* District Field */}
          <div className="w-full">
            <label className="input validator flex items-center gap-2">
              <select
                className="w-full bg-transparent focus:outline-none"
                defaultValue=""
                {...register("district", { required: true })}
              >
                <option value="" disabled>
                  Select District
                </option>
                {districts.map((district) => (
                  <option
                    key={district.id}
                    className="text-black"
                    value={district.name}
                  >
                    {district.name}
                  </option>
                ))}
              </select>
            </label>
            {errors.district && (
              <p className="mt-1 text-red-500">Please select District</p>
            )}
          </div>
          {/* Upazila Field */}
          <div className="w-full">
            <label className="input validator flex items-center gap-2">
              <select
                className="w-full bg-transparent focus:outline-none"
                defaultValue=""
                {...register("upazila", { required: true })}
              >
                <option value="" disabled>
                  Select Upazila
                </option>
                {upazilas.map((upazila) => (
                  <option
                    key={upazila.id}
                    className="text-black"
                    value={upazila.name}
                  >
                    {upazila.name}
                  </option>
                ))}
              </select>
            </label>
            {errors.upazila && (
              <p className="mt-1 text-red-500">Please select Upazilla</p>
            )}
          </div>
          {/* Gender Field */}
          <div className="w-full">
            <label className="input validator flex items-center gap-2">
              {/* Gender Icon */}
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 7v-5m0-5v5"
                />
              </svg>

              <select
                className="w-full bg-transparent focus:outline-none"
                defaultValue=""
                {...register("gender", { required: true })}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option className="text-black" value="Male">
                  Male
                </option>
                <option className="text-black" value="Female">
                  Female
                </option>
                <option className="text-black" value="Other">
                  Other
                </option>
              </select>
            </label>
            {errors.gender && (
              <p className="mt-1 text-red-500">Please select your gender</p>
            )}
          </div>

          {/* Submit button */}
          <div className="form-control mt-6 md:col-span-2">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterFormHome;
