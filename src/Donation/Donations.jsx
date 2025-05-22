import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaRegHospital, FaRegUser, FaUserInjured } from "react-icons/fa";
import { MdLocalPhone, MdOutlineBloodtype } from "react-icons/md";
import { FaLocationCrosshairs, FaLocationDot } from "react-icons/fa6";
import { BsCalendar2Date } from "react-icons/bs";
import { GrFormNext, GrFormPrevious, GrStatusGood } from "react-icons/gr";
import SpotlightCard from "../Shared/SpotlightCard";
import Context from "../Context/Context";
import { Link } from "react-router-dom";

const MyDonationReqAll = () => {
  const { user } = useContext(Context);
  const [donationReqs, setDonationReqs] = useState([]);
  const [donationPerPage, setDonationPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sortOrder, setSortOrder] = useState("oldest");
  const numberOfPages = Math.ceil(totalCount / donationPerPage);
  const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1);

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
      axios;
      axios
        .get(
          `http://localhost:5000/donation-requests?page=${currentPage}&size=${donationPerPage}&sortOrder=${sortOrder}`
        )
        .then((res) => {
          setDonationReqs(res.data.data);
          setTotalCount(res.data.count);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user, currentPage, donationPerPage, sortOrder]);

  return (
    <div className="mt-12 p-6 min-h-full w-full text-slate-100 flex flex-col items-center gap-7">
      <div>
        <p className="text-center text-lg md:text-2xl lg:text-4xl font-bold">
          Donation Requests!
        </p>
      </div>

      <div className="flex items-center justify-end w-full mb-4">
        <label className="mr-2 font-semibold text-base">Sort by Date:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select select-sm select-bordered"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {donationReqs.map((req) => (
          <SpotlightCard key={req._id}>
            <p className="text-center text-xl font-semibold mb-4">
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
            </div>
            <div className="mt-3 flex items-center justify-end">
              <Link state={{ req }} to={"/donateNow"}>
                <button className="btn btn-sm md:btn-md btn-primary">
                  Donate Now
                </button>
              </Link>
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
    </div>
  );
};

export default MyDonationReqAll;
