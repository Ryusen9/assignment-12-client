import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { FaRegUser, FaUserInjured, FaRegHospital } from "react-icons/fa";
import { MdLocalPhone, MdOutlineBloodtype } from "react-icons/md";
import { FaLocationCrosshairs, FaLocationDot } from "react-icons/fa6";
import { BsCalendar2Date } from "react-icons/bs";
import axios from "axios";
import Swal from "sweetalert2";
import Context from "../Context/Context";

const ApplyDonation = () => {
  const { state } = useLocation();
  const req = state?.req;
  const containerRef = useRef(null);
  const { user } = useContext(Context);
  const volunteerEmail = user?.email;
  const navigate = useNavigate();
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

    return () => ctx.revert(); // cleanup for GSAP context
  }, []);

  if (!req) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-red-500">
        No donation request data provided.
      </div>
    );
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5000/volunteers/${volunteerEmail}`)
      .then((res) => {
        if (res.data) {
          setCurrentVolunteer(res.data);
        }
      });
  }, []);
  console.log(currentVolunteer);
  console.log(req);
  const handleApply = () => {
    if (currentVolunteer.bloodGroup !== req.bloodGroup) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Your blood group does not match the request.",
      });
    } else {
      axios
        .post("http://localhost:5000/volunteers-donations", {
          req,
          volunteerName: currentVolunteer.name,
          volunteerEmail: currentVolunteer.email,
        })
        .then((res) => {
          if (res.data.acknowledged) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "You have successfully applied to donate blood.",
            }).then(() => {
              navigate("/donations");
            });
          }
        });
    }
  };
  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 text-white flex justify-center items-center p-4"
    >
      <div className="donation-card max-w-3xl w-full bg-white text-slate-900 rounded-2xl shadow-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-red-600">
          Blood Donation Request
        </h2>
        <div className="space-y-4 text-base font-medium">
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
            <MdOutlineBloodtype /> Blood Group: {req.bloodGroup}
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
          <div className="p-4 bg-slate-100 rounded-md">
            <p className="text-black">
              <span className="font-semibold">Message:</span>{" "}
              {req.request_message || "No message provided"}
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleApply}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Apply to Donate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyDonation;
