import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import {
  FaRegUser,
  FaUserInjured,
  FaRegHospital,
  FaLocationCrosshairs,
  FaLocationDot,
} from "react-icons/fa6";
import { MdLocalPhone, MdOutlineBloodtype } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";
import axios from "axios";
import Swal from "sweetalert2";
import Context from "../Context/Context";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const ApplyDonation = () => {
  const { state } = useLocation();
  const { user } = useContext(Context);
  const req = state?.req;
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [loading, setLoading] = useState(false);
  const volunteerEmail = user?.email;
  const [currentVolunteer, setCurrentVolunteer] = useState(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".donation-card", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!volunteerEmail) return;

    axios
      .get(`http://localhost:5000/volunteers/${volunteerEmail}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          setCurrentVolunteer(res.data);
        }
      })
      .catch((err) => console.error("Error fetching volunteer:", err));
  }, [volunteerEmail]);

  const handleApply = async () => {
    if (!selectedBloodGroup) {
      return Swal.fire({
        icon: "warning",
        title: "Select Blood Group",
        text: "Please select your blood group as a volunteer before applying.",
      });
    }

    if (selectedBloodGroup !== req.bloodGroup) {
      return Swal.fire({
        icon: "error",
        title: "Blood Group Mismatch",
        text: "Your selected blood group does not match the required one.",
      });
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/volunteers-donations",
        {
          req,
          volunteerName: currentVolunteer.name,
          volunteerEmail: currentVolunteer.email,
        },
        { withCredentials: true }
      );

      if (res.data?.acknowledged) {
        await axios.patch(
          `http://localhost:5000/donation-requests/${req._id}`,
          { status: "in progress" },
          { withCredentials: true }
        );

        Swal.fire({
          icon: "success",
          title: "Application Submitted",
          text: "You have successfully applied to donate blood.",
        }).then(() => navigate("/donations"));
      } else {
        throw new Error("Application failed.");
      }
    } catch (error) {
      console.error("Error applying:", error);
      Swal.fire({
        icon: "error",
        title: "Application Failed",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!req) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-red-500">
        No donation request data provided.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 text-white flex justify-center items-center p-4"
    >
      <div className="donation-card grid md:grid-cols-2 gap-6 max-w-5xl w-full bg-white text-slate-900 rounded-2xl shadow-2xl p-8">
        {/* Left Side - Request Info */}
        <div className="space-y-4 text-base font-medium">
          <h2 className="text-3xl font-bold text-red-600">Donation Details</h2>
          <p className="flex items-center gap-3">
            <FaRegUser /> Donor Name: {req.name}
          </p>
          <p className="flex items-center gap-3">
            <FaUserInjured /> Recipient Name: {req.recipient_name}
          </p>
          <p className="flex items-center gap-3">
            <FaRegHospital /> Hospital: {req.hospital_name}
          </p>
          <p className="flex items-center gap-3">
            <MdLocalPhone /> Phone: {req.phone}
          </p>
          <p className="flex items-center gap-3">
            <MdOutlineBloodtype /> Required Blood Group: {req.bloodGroup}
          </p>
          <p className="flex items-center gap-3">
            <FaLocationCrosshairs /> District: {req.district}
          </p>
          <p className="flex items-center gap-3">
            <FaLocationDot /> Address: {req.full_address}
          </p>
          <p className="flex items-center gap-3">
            <BsCalendar2Date /> Date & Time:{" "}
            {new Date(
              `${req.donation_date}T${req.donation_time}`
            ).toLocaleString("en-BD", {
              timeZone: "Asia/Dhaka",
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>

        {/* Right Side - Apply Form */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <label className="block font-semibold text-lg">
              Your Blood Group
            </label>
            <select
              value={selectedBloodGroup}
              onChange={(e) => setSelectedBloodGroup(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select your blood group</option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
            <div className="p-4 bg-slate-100 rounded-md text-black">
              <p>
                <span className="font-semibold">Message:</span>{" "}
                {req.request_message || "No message provided"}
              </p>
            </div>
          </div>

          <button
            onClick={handleApply}
            disabled={loading}
            className={`mt-6 w-full ${
              loading ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
            } text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg`}
          >
            {loading ? "Applying..." : "Apply to Donate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyDonation;
