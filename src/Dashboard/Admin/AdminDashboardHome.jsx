import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Context from "../../Context/Context";
import axios from "axios";
import SpotlightCard from "../../Shared/SpotlightCard";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AdminDashboardHome = () => {
  const { user } = useContext(Context);
  const [currentUser, setCurrentUser] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
    if (user?.email) {
      axios.get(`http://localhost:5000/users-by-email/${user?.email}`).then((res) => {
        if (res.data) {
          setCurrentUser(res.data);
          reset(res.data); // populate form
        }
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    let imageURL = currentUser?.profilePicture;

    if (data.profilePicture && data.profilePicture.length > 0) {
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
      location: data.location || "",
      bio: data.bio || "",
      profilePicture: imageURL,
    };

    axios
      .patch(`http://localhost:5000/users-by-email/${user?.email}`, updatedData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Profile Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        setCurrentUser((prev) => ({ ...prev, ...updatedData }));
      })
      .then(() => {
        window.location.reload();
      });
  };

  if (!currentUser) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <p className="text-center text-2xl md:text-3xl font-bold mb-6">
        Information Regarding Admin
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <SpotlightCard>
          <p className="text-xl font-semibold mb-4 text-center">
            PERSONAL INFORMATION
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Picture Preview */}
            <div className="flex flex-col items-center">
              <img
                src={currentUser?.profilePicture}
                alt="User Avatar"
                className="w-32 h-32 rounded-full border mb-2"
              />
              <input
                type="file"
                {...register("profilePicture")}
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </div>

            {/* Editable Fields */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="label">Full Name</label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="input input-bordered w-full"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  value={currentUser?.email}
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>

              <div>
                <label className="label">Location</label>
                <input
                  type="text"
                  {...register("location")}
                  className="input input-bordered w-full"
                  placeholder="e.g., Dhaka, Bangladesh"
                />
              </div>

              <div>
                <label className="label">Bio</label>
                <textarea
                  {...register("bio")}
                  className="textarea textarea-bordered w-full"
                  placeholder="Tell us something about yourself..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button type="submit" className="btn btn-primary">
              Update Profile
            </button>
          </div>
        </SpotlightCard>
      </form>
    </div>  
)
};

export default AdminDashboardHome;
