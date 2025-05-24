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
  const [bloodGroupFilter, setBloodGroupFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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
    axios
      .get(
        `https://server-theta-virid.vercel.app/users-by-email/${user?.email}`
      )
      .then((res) => {
        if (res.data) {
          setCurrentUser(res.data);
        }
      });
  }, []);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://server-theta-virid.vercel.app/donation-requests?page=${currentPage}&size=${donationPerPage}&sortOrder=${sortOrder}&bloodGroup=${bloodGroupFilter}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setDonationReqs(res.data.data);
        setTotalCount(res.data.count);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, currentPage, donationPerPage, sortOrder, bloodGroupFilter]);

  return (
    <div className="mt-12 p-6 w-full text-slate-100 flex flex-col items-center gap-7">
      <p className="text-center text-2xl lg:text-4xl font-bold">
        Donation Requests!
      </p>

      <div className="flex flex-wrap items-center justify-between w-full mb-4 gap-4">
        <div className="flex flex-col items-start gap-2">
          <label className="font-semibold">Filter by Blood Group:</label>
          <select
            value={bloodGroupFilter}
            onChange={(e) => {
              setBloodGroupFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="select select-sm select-bordered"
          >
            <option value="">All</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        <div className="flex flex-col items-start gap-2">
          <label className="font-semibold">Sort by Date:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="select select-sm select-bordered"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-xl font-medium text-center">Loading...</p>
      ) : donationReqs.length === 0 ? (
        <p className="text-xl font-medium text-center text-gray-400">
          No donation requests found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {donationReqs.map((req) => (
            <SpotlightCard
              className={
                req.status === "completed" || req.status === "in progress"
                  ? "hidden"
                  : ""
              }
              key={req._id}
            >
              <p className="text-center text-xl font-semibold mb-4">
                Blood Donation Request
              </p>
              <div className="flex flex-col gap-4">
                <p className="flex items-center gap-3">
                  <FaRegUser /> Name: {req.name}
                </p>
                <p className="flex items-center gap-3">
                  <FaUserInjured /> Recipient Name: {req.recipient_name}
                </p>
                <p className="flex items-center gap-3">
                  <FaRegHospital /> Hospital Name: {req.hospital_name}
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
                  <BsCalendar2Date /> Donation Date and Time:{" "}
                  {new Date(
                    `${req.donation_date}T${req.donation_time}`
                  ).toLocaleString("en-BD", {
                    timeZone: "Asia/Dhaka",
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
                <p className="flex items-center gap-3">
                  <FaLocationDot /> Address: {req.full_address}
                </p>
                <p className="flex items-center gap-3">
                  <GrStatusGood /> Status:
                  <span
                    className={`ml-2 px-2 py-1 rounded text-white text-xs uppercase ${
                      req.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-green-600"
                    }`}
                  >
                    {req.status}
                  </span>
                </p>
                <div className="p-3 bg-white rounded-md text-sm text-black">
                  <p>Message from requester: {req.request_message}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-end">
                <Link state={{ req }} to={`/donateNow/${req._id}`}>
                  <button
                    disabled={currentUser.role === "user"}
                    className="btn btn-sm md:btn-md btn-primary"
                  >
                    Donate Now
                  </button>
                </Link>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex flex-col items-center mt-10">
        <p className="mb-2">Current Page: {currentPage}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handlePrvPage}
            className="btn btn-sm btn-outline btn-primary"
            disabled={currentPage === 1}
          >
            <GrFormPrevious />
          </button>
          <div className="join">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`join-item btn btn-sm ${
                  currentPage === page ? "btn-active" : ""
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={handleNxtPage}
            className="btn btn-sm btn-outline btn-primary"
            disabled={currentPage === numberOfPages}
          >
            <GrFormNext />
          </button>
          <select
            className="select ml-4 select-sm"
            value={donationPerPage}
            onChange={handleItemNumberChange}
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
