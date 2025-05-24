import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import BlurText from "../../Shared/BlurText";

const AllPost = () => {
  const [donatePosts, setDonatePosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get("http://localhost:5000/donation-requests").then((res) => {
      if (Array.isArray(res.data.data)) {
        const withStatus = res.data.data.map((post) => ({
          ...post,
          localStatus: post.status || "pending",
        }));
        setDonatePosts(withStatus);
      } else {
        setDonatePosts([]);
      }
    });
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedPosts = [...donatePosts];
    updatedPosts[index].localStatus = newStatus;
    setDonatePosts(updatedPosts);
  };

  const handleSave = (post, index) => {
    axios
      .patch(`http://localhost:5000/donation-requests/${post._id}`, {
        status: post.localStatus,
      })
      .then(() => {
        Swal.fire("Success", "Status updated!", "success");
        fetchPosts();
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update status", "error");
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This post will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/donation-requests/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "The post has been deleted.", "success");
            fetchPosts();
          })
          .catch(() => {
            Swal.fire("Error", "Failed to delete post", "error");
          });
      }
    });
  };

  return (
    <div className="min-w-full h-full p-6 flex flex-col items-center">
      <div>
        <BlurText
          text="ALL POSTS IN ONE PLACE!"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-lg md:text-2xl lg:text-4xl font-semibold mb-8"
        />
      </div>
      <div className="w-full h-full">
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Posted By</th>
                <th>Post ID</th>
                <th>Created At</th>
                <th className="text-center">Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donatePosts.map((post, index) => (
                <tr key={post._id}>
                  <td>{index + 1}</td>
                  <td>{post.postedBy?.name || "Unknown"}</td>
                  <td>{post._id}</td>
                  <td>{new Date(post.createdAt).toLocaleString()}</td>
                  <td className="text-center">
                    <select
                      value={post.localStatus}
                      onChange={(e) =>
                        handleStatusChange(index, e.target.value)
                      }
                      className="select select-bordered select-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td className="text-center space-x-2">
                    <button
                      onClick={() => handleSave(post, index)}
                      className="btn btn-success btn-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {donatePosts.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No posts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllPost;
