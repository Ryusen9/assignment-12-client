import React, { useEffect, useState } from "react";
import BlurText from "../../Shared/BlurText";
import axios from "axios";
import Swal from "sweetalert2";

const UserList = () => {
  const [usersAll, setUsersAll] = useState([]);
  const [updatedRoles, setUpdatedRoles] = useState({}); // Track changed roles

  const fetchUsers = () => {
    axios.get("https://server-theta-virid.vercel.app/users").then((res) => {
      if (res.data) {
        setUsersAll(res.data);
      }
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDropdownChange = (userId, newRole) => {
    setUpdatedRoles((prev) => ({ ...prev, [userId]: newRole }));
  };

  const handleSave = (userId) => {
    const newRole = updatedRoles[userId];
    if (!newRole) return;

    axios
      .patch(`https://server-theta-virid.vercel.app/users/${userId}`, {
        role: newRole,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          fetchUsers();
          Swal.fire("Success!", "User role updated successfully.", "success");
          setUpdatedRoles((prev) => {
            const updated = { ...prev };
            delete updated[userId];
            return updated;
          });
        } else {
          Swal.fire("Info", "Role was not changed.", "info");
        }
      })
      .catch((err) => {
        console.error("Failed to update role:", err);
        Swal.fire("Error", "Failed to update role.", "error");
      });
  };

  return (
    <div className="min-w-full h-full p-6 flex flex-col items-center">
      <div>
        <BlurText
          text="ALL USERS IN ONE PLACE!"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-lg md:text-2xl lg:text-4xl font-semibold mb-8"
        />
      </div>
      <div className="w-full h-full">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Address</th>
                <th>Created at</th>
                <th className="text-center">Role</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersAll.map((user, index) => {
                const selectedRole = updatedRoles[user._id] || user.role;
                return (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={user.profilePicture} alt="User avatar" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.name}</div>
                          <div className="text-sm opacity-50">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{user.location || "N/A"}</td>
                    <td>{new Date(user.createdAt).toLocaleString()}</td>
                    <td>
                      <select
                        className="select select-sm select-bordered"
                        value={selectedRole}
                        onChange={(e) =>
                          handleDropdownChange(user._id, e.target.value)
                        }
                      >
                        <option value="user">User</option>
                        <option value="volunteer">Volunteer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="flex gap-2 items-center justify-center">
                      <button
                        className="btn btn-sm btn-outline btn-primary"
                        onClick={() => handleSave(user._id)}
                        disabled={selectedRole === user.role}
                      >
                        SAVE
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
