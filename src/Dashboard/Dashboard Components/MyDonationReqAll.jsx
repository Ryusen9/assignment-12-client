import React, { useContext, useEffect, useRef, useState } from "react";
import SpotlightCard from "../../Shared/SpotlightCard";
import axios from "axios";
import Context from "../../Context/Context";
import { FaRegHospital, FaRegUser, FaUserInjured } from "react-icons/fa";
import { MdLocalPhone, MdOutlineBloodtype } from "react-icons/md";
import { FaLocationCrosshairs, FaLocationDot } from "react-icons/fa6";
import { BsCalendar2Date } from "react-icons/bs";
import { GrFormNext, GrFormPrevious, GrStatusGood } from "react-icons/gr";
import gsap from "gsap";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";

const MyDonationReqAll = () => {
  const { user } = useContext(Context);
  const [donationReqs, setDonationReqs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedReq, setSelectedReq] = useState(null);
  const [donationPerPage, setDonationPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const modalRef = useRef(null);

  // Calculate the number of pages;
  const numberOfPages = Math.ceil(totalCount / donationPerPage);

  const pages = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pages.push(i);
  }

  const handlePrvPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNxtPage = () => {
    if (currentPage < numberOfPages) setCurrentPage(currentPage + 1);
  };
  const handleItemNumberChange = (e) => {
    const value = parseInt(e.target.value);
    setDonationPerPage(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `http://localhost:5000/donation-requests?email=${user.email}&page=${currentPage}&size=${donationPerPage}`
        )
        .then((res) => {
          // Destructure total and requests from response
          setDonationReqs(res.data.data);
          setTotalCount(res.data.count);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user, currentPage, donationPerPage]);

  useEffect(() => {
    if (isEditing && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.85, y: -40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [isEditing]);

  const handleEditClick = (req) => {
    setSelectedReq(req);
    setIsEditing(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData.entries());

    axios
      .patch(
        `http://localhost:5000/donation-requests/${selectedReq._id}`,
        updatedData,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Request updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        if (res.data.modifiedCount > 0) {
          const updatedReqs = donationReqs.map((req) =>
            req._id === selectedReq._id ? { ...req, ...updatedData } : req
          );
          setDonationReqs(updatedReqs);
          setIsEditing(false);
        }
      });
  };
  const handleDelete = (reqId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/donation-requests/${reqId}`, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.status === 200) {
              Swal.fire(
                "Deleted!",
                "Your request has been deleted.",
                "success"
              );
              setDonationReqs(donationReqs.filter((req) => req._id !== reqId));
            }
          });
      }
    });
  };
  return (
    <div className="p-6 min-h-full w-full text-slate-100 flex flex-col items-center gap-7">
      <div>
        <p className="text-center text-lg md:text-2xl lg:text-4xl font-bold">
          Donation Requests!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {donationReqs.map((req) => (
          <SpotlightCard key={req._id}>
            <p className="text-center text-lg md:text-xl font-semibold mb-4">
              Blood Donation Request
            </p>
            <div className="flex flex-col gap-4">
              <p className="flex items-center gap-3 text-sm md:text-base font-medium">
                <FaRegUser /> Name: {req.name}
              </p>
              <p className="flex items-center gap-3 text-sm md:text-base font-medium">
                <FaUserInjured /> Recipient Name: {req.recipient_name}
              </p>
              <p className="flex items-center gap-3 text-sm md:text-base font-medium">
                <FaRegHospital /> Hospital Name: {req.hospital_name}
              </p>
              <p className="flex items-center gap-3 text-sm md:text-base font-medium">
                <MdLocalPhone /> Phone: {req.phone}
              </p>
              <p className="flex items-center gap-3 text-sm md:text-base font-medium">
                <MdOutlineBloodtype /> Blood Group: {req.bloodGroup}
              </p>
              <p className="flex items-center gap-3 text-sm md:text-base font-medium">
                <FaLocationCrosshairs /> District: {req.district}
              </p>
              <p className="flex items-center gap-3 text-sm md:text-base font-medium">
                <BsCalendar2Date /> Donation Date and Time:{" "}
                {new Date(
                  `${req.donation_date}T${req.donation_time}`
                ).toLocaleString("en-BD", {
                  timeZone: "Asia/Dhaka",
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
              <p className="flex gap-3 items-center text-sm md:text-base font-medium">
                <FaLocationDot /> Address: {req.full_address}
              </p>
              <p className="flex gap-3 items-center text-sm md:text-base font-medium">
                <GrStatusGood /> Status:{" "}
                <span
                  className={`badge badge-soft flex items-center justify-center ${
                    req.status === "pending" ? "badge-primary" : "badge-success"
                  } uppercase`}
                >
                  {req.status}
                </span>
              </p>
              <div className="p-2 bg-white rounded-md text-sm md:text-base font-medium text-black">
                <p>Message from requester: {req.request_message}</p>
              </div>
              <div className="flex justify-between items-center">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleEditClick(req)}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(req._id)}
                  className="btn btn-sm btn-error btn-outline"
                >
                  Delete Request
                </button>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center">
        <p>Current Page: {currentPage}</p>
        <div className="flex items-center justify-center gap-2.5 my-6">
          <button
            onClick={handlePrvPage}
            className="btn btn-primary btn-outline text-xl"
            disabled={currentPage === 1}
          >
            <GrFormPrevious />
          </button>
          <div className="join">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`join-item btn ${
                  currentPage === page ? "btn-active" : ""
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={handleNxtPage}
            className="btn btn-primary btn-outline text-xl"
            disabled={currentPage === numberOfPages}
          >
            <GrFormNext />
          </button>
          <select
            defaultValue={10}
            className="select ml-3"
            onChange={handleItemNumberChange}
            value={donationPerPage}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {/* Floating Edit Modal */}
      {isEditing && selectedReq && (
        <div className="fixed inset-0 bg-base-200/90 bg-opacity-60 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white text-black p-6 rounded-lg shadow-lg w-[90%] md:w-[600px] max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-bold mb-4">Edit Donation Request</h2>
            <form
              onSubmit={handleUpdate}
              className="grid text-white grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Name */}
              <div className="flex flex-col">
                <label className="font-medium text-black mb-1">Your Name</label>
                <input
                  name="name"
                  defaultValue={selectedReq.name}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Recipient Name */}
              <div className="flex flex-col">
                <label className="font-medium text-black mb-1">
                  Recipient Name
                </label>
                <input
                  name="recipient_name"
                  defaultValue={selectedReq.recipient_name}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Hospital Name */}
              <div className="flex flex-col">
                <label className="font-medium text-black mb-1">
                  Hospital Name
                </label>
                <input
                  name="hospital_name"
                  defaultValue={selectedReq.hospital_name}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="font-medium text-black mb-1">Phone</label>
                <input
                  name="phone"
                  defaultValue={selectedReq.phone}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Blood Group */}
              <div className="flex flex-col">
                <label className="font-medium text-black mb-1">
                  Blood Group
                </label>
                <input
                  name="bloodGroup"
                  defaultValue={selectedReq.bloodGroup}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* District */}
              <div className="flex flex-col">
                <label className="font-medium text-black mb-1">District</label>
                <input
                  name="district"
                  defaultValue={selectedReq.district}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Donation Date */}
              <div className="flex flex-col">
                <label className="font-medium text-black mb-1">
                  Donation Date
                </label>
                <input
                  type="date"
                  name="donation_date"
                  defaultValue={selectedReq.donation_date}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Donation Time */}
              <div className="flex flex-col">
                <label className="font-medium text-black mb-1">
                  Donation Time
                </label>
                <input
                  type="time"
                  name="donation_time"
                  defaultValue={selectedReq.donation_time}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Full Address (full width) */}
              <div className="flex flex-col md:col-span-2">
                <label className="font-medium text-black mb-1">
                  Full Address
                </label>
                <input
                  name="full_address"
                  defaultValue={selectedReq.full_address}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Request Message (full width) */}
              <div className="flex flex-col md:col-span-2">
                <label className="font-medium text-black mb-1">
                  Message from Requester
                </label>
                <textarea
                  name="request_message"
                  defaultValue={selectedReq.request_message}
                  className="textarea textarea-bordered w-full"
                  rows="3"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 md:col-span-2 mt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn btn-outline btn-error"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDonationReqAll;
