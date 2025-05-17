import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const CreateDonationReq = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const onSubmit = async (data) => {
    const {
      name,
      email,
      phone,
      recipient_name,
      district,
      upazila,
      hospital_name,
      full_address,
      bloodGroup,
      donation_date,
      donation_time,
      request_message,
    } = data;
    const newRequest = {
      name,
      email,
      phone,
      recipient_name,
      district,
      upazila,
      hospital_name,
      full_address,
      bloodGroup,
      donation_date,
      donation_time,
      request_message,
    };
    console.log(newRequest)
    try {
      await axios
        .post("http://localhost:5000/donation-requests", newRequest)
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Donation Request Created",
              text: "Your donation request has been created successfully.",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              reset();
            });
          }
        });
      reset();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to create donation request. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    axios.get("/districts.json").then((res) => setDistricts(res.data));
    axios.get("/upazilas.json").then((res) => {
      const sortedUpazilas = res.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setUpazilas(sortedUpazilas);
    });
  }, []);
  return (
    <div className="p-6 min-h-full w-full">
      <div>
        <p className="text-center text-lg md:text-2xl lg:text-4xl font-bold">
          Create Donation Request!
        </p>
      </div>
      {/* Form to create a donation request */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        action="donation req"
        className="grid border-2 max-w-6xl mx-auto content-center items-center justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 bg-base-300 p-6 rounded-lg"
      >
        {/* Name */}
        <div>
          <label className="input validator">
            <input
              type="text"
              className={`w-full ${errors.name ? "border-red-500" : ""}`}
              placeholder="Enter your name."
              title="Only Letters, numbers and dash"
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

        {/* Email */}
        <div>
          <label className="input validator">
            <input
              type="email"
              className={`w-full ${errors.email ? "border-red-500" : ""}`}
              placeholder="Enter your email."
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
            />
          </label>
          {/* Error messages for Email */}
          {errors.email?.type === "required" && (
            <p className="mt-1 text-red-500">Email is required</p>
          )}
          {errors.email?.type === "pattern" && (
            <p className="mt-1 text-red-500">Invalid email format</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="input validator">
            <input
              type="tel"
              className={`w-full ${errors.phone ? "border-red-500" : ""}`}
              placeholder="Enter your phone number."
              {...register("phone", {
                required: true,
                pattern: /^[0-9]{11}$/,
              })}
            />
          </label>
          {/* Error messages for Phone */}
          {errors.phone?.type === "required" && (
            <p className="mt-1 text-red-500">Phone number is required</p>
          )}
          {errors.phone?.type === "pattern" && (
            <p className="mt-1 text-red-500">Invalid phone number format</p>
          )}
        </div>

        {/* Recipient Name */}
        <div>
          <label className="input validator">
            <input
              type="text"
              className={`w-full ${
                errors.recipient_name ? "border-red-500" : ""
              }`}
              placeholder="Enter recipient name."
              {...register("recipient_name", {
                required: true,
                pattern: /^[A-Za-z][A-Za-z0-9\-]*$/,
                minLength: 3,
                maxLength: 30,
              })}
            />
          </label>
          {/* Error messages for Recipient Name */}
          {errors.recipient_name?.type === "required" && (
            <p className="mt-1 text-red-500">Recipient name is required</p>
          )}
          {errors.recipient_name?.type === "pattern" && (
            <p className="mt-1 text-red-500">
              Recipient name must start with a letter and can only contain
              letters, numbers, or dashes
            </p>
          )}
          {errors.recipient_name?.type === "minLength" && (
            <p className="mt-1 text-red-500">
              Recipient name must be at least 3 characters
            </p>
          )}
          {errors.recipient_name?.type === "maxLength" && (
            <p className="mt-1 text-red-500">
              Recipient name must not exceed 30 characters
            </p>
          )}
        </div>

        {/* District */}
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

        {/* Hospital Name */}
        <div className="col-span-full w-full">
          <label className="input w-full">
            <input
              type="text"
              className={`w-full ${
                errors.hospital_name ? "border-red-500" : ""
              }`}
              placeholder="Enter hospital name."
              {...register("hospital_name", {
                required: true,
                minLength: 3,
                maxLength: 70,
              })}
            />
          </label>
          {/* Error messages for Hospital Name */}
          {errors.hospital_name?.type === "required" && (
            <p className="mt-1 text-red-500">Hospital name is required</p>
          )}
          {errors.hospital_name?.type === "minLength" && (
            <p className="mt-1 text-red-500">
              Hospital name must be at least 3 characters
            </p>
          )}
          {errors.hospital_name?.type === "maxLength" && (
            <p className="mt-1 text-red-500">
              Hospital name must not exceed 70 characters
            </p>
          )}
        </div>

        {/* Full Address */}
        <div className="col-span-full w-full">
          <label className="input lg:w-full">
            <input
              type="text"
              className={`w-full ${
                errors.full_address ? "border-red-500" : ""
              }`}
              placeholder="Enter full address."
              {...register("full_address", {
                required: true,
                minLength: 3,
                maxLength: 70,
              })}
            />
          </label>
          {errors.full_address?.type === "required" && (
            <p className="mt-1 text-red-500">Full address is required</p>
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
            <p className="mt-1 text-red-500">Please select your blood group</p>
          )}
        </div>

        {/* Donation Date */}
        <div>
          <label className="input validator">
            <input
              type="date"
              className={`w-full ${
                errors.donation_date ? "border-red-500" : ""
              }`}
              {...register("donation_date", { required: true })}
            />
          </label>
          {/* Error messages for Donation Date */}
          {errors.donation_date && (
            <p className="mt-1 text-red-500">Donation date is required</p>
          )}
        </div>

        {/* Donation Time */}
        <div>
          <label className="input validator">
            <input
              type="time"
              className={`w-full ${
                errors.donation_time ? "border-red-500" : ""
              }`}
              {...register("donation_time", { required: true })}
            />
          </label>
          {/* Error messages for Donation Time */}
          {errors.donation_time && (
            <p className="mt-1 text-red-500">Donation time is required</p>
          )}
        </div>

        {/* Request message */}
        <div className="col-span-full w-full h-20">
          <label className="input h-full lg:w-full">
            <textarea
              type="text"
              className={`w-full h-full ${
                errors.request_message ? "border-red-500" : ""
              }`}
              placeholder="Enter your request message."
              {...register("request_message", {
                required: true,
                minLength: 10,
                maxLength: 300,
              })}
            />
          </label>
          {errors.request_message?.type === "required" && (
            <p className="mt-1 text-red-500">Request message is required</p>
          )}
          {errors.request_message?.type === "minLength" && (
            <p className="mt-1 text-red-500">
              Request message must be at least 10 characters
            </p>
          )}
          {errors.request_message?.type === "maxLength" && (
            <p className="mt-1 text-red-500">
              Request message must not exceed 300 characters
            </p>
          )}
        </div>
        {/* Submit button */}
        <div className="form-control mt-6 md:col-span-2">
          <button type="submit" className="btn btn-primary">
            Request Donation
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDonationReq;
