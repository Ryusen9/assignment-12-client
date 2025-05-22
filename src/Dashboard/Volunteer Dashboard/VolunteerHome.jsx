import React, { useContext, useEffect, useState } from "react";
import Context from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const VolunteerHome = () => {
  const { user } = useContext(Context);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  useEffect(() => {
    if (!user) navigate("/login");
    if (user?.email) {
      axios
        .get(`http://localhost:5000/volunteers/${user.email}`)
        .then((res) => {
          if (res.data) {
            setCurrentUser(res.data);
            reset(res.data); // prefill the form
          }
        });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    let imageURL = currentUser?.photo;

    if (data.profilePicture?.[0]) {
      const formData = new FormData();
      formData.append("image", data.profilePicture[0]);

      try {
        const imgRes = await axios.post(image_hosting_api, formData);
        if (imgRes.data.success) {
          imageURL = imgRes.data.data.url;
        }
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }

    const updatedData = {
      name: data.name,
      age: data.age,
      bloodGroup: data.bloodGroup,
      profession: data.profession,
      contact: data.contact,
      address: data.address,
      gender: data.gender,
      photo: imageURL,
    };

    axios
      .patch(`http://localhost:5000/volunteers/${user.email}`, updatedData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success", "Profile updated successfully!", "success");
        }
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Update Your Profile
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-300 shadow-2xl p-6 rounded-xl"
      >
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            className="w-full p-2 border rounded-lg"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">Name is required</span>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="block mb-1 font-medium">Age</label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg"
            {...register("age", { required: true })}
          />
          {errors.age && (
            <span className="text-red-500 text-sm">Age is required</span>
          )}
        </div>

        {/* Blood Group */}
        <div>
          <label className="block mb-1 font-medium">Blood Group</label>
          <select
            className="w-full p-2 border rounded-lg"
            {...register("bloodGroup", { required: true })}
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A−">A−</option>
            <option value="B+">B+</option>
            <option value="B−">B−</option>
            <option value="AB+">AB+</option>
            <option value="AB−">AB−</option>
            <option value="O+">O+</option>
            <option value="O−">O−</option>
          </select>
          {errors.bloodGroup && (
            <span className="text-red-500 text-sm">Required</span>
          )}
        </div>

        {/* Profession */}
        <div>
          <label className="block mb-1 font-medium">Profession</label>
          <input
            className="w-full p-2 border rounded-lg"
            {...register("profession")}
          />
        </div>

        {/* Contact */}
        <div>
          <label className="block mb-1 font-medium">Contact Number</label>
          <input
            className="w-full p-2 border rounded-lg"
            {...register("contact", { required: true })}
          />
          {errors.contact && (
            <span className="text-red-500 text-sm">Required</span>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input
            className="w-full p-2 border rounded-lg"
            {...register("address")}
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <select
            className="w-full p-2 border rounded-lg"
            {...register("gender", { required: true })}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <span className="text-red-500 text-sm">Required</span>
          )}
        </div>

        {/* Profile Picture */}
        <div>
          <label className="block mb-1 font-medium">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded-lg"
            {...register("profilePicture")}
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg font-semibold transition"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default VolunteerHome;
