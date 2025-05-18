import React, { useContext, useEffect } from "react";
import SpotlightCard from "../../Shared/SpotlightCard";
import axios from "axios";
import Context from "../../Context/Context";
import { FaRegHospital, FaRegUser, FaUserInjured } from "react-icons/fa";
import { MdLocalPhone, MdOutlineBloodtype } from "react-icons/md";
import { FaLocationCrosshairs, FaLocationDot } from "react-icons/fa6";
import { BsCalendar2Date } from "react-icons/bs";
import { GrStatusGood } from "react-icons/gr";

const MyDonationReqAll = () => {
  const { user } = useContext(Context);
  const [donationReqs, setDonationReqs] = React.useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/donation-requests?${user?.email}`)
      .then((res) => {
        setDonationReqs(res.data);
      });
  }, []);
  console.log(donationReqs);
  return (
    <div className="p-6 min-h-full w-full text-slate-100">
      <div>
        <p className="text-center text-lg md:text-2xl lg:text-4xl font-bold">
          Donation Requests!
        </p>
      </div>
      {/* All the Donation Requests */}
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
                <GrStatusGood /> Status: {req.status}
              </p>
              <div className="p-2 bg-white rounded-md text-sm md:text-base font-medium text-black">
                <p>Message from requester: {req.request_message}</p>
              </div>
              <div className="flex justify-between items-center">
                <button className="btn btn-sm btn-primary">Edit</button>
                <button className="btn btn-sm btn-error btn-outline">Delete Request</button>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
};

export default MyDonationReqAll;
