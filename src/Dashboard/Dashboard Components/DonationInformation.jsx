import React from "react";
import { Link } from "react-router-dom";

const DonationInformation = () => {
  return (
    <div>
      <p className="text-center text-lg md:text-2xl lg:text-4xl font-bold">
        Information Regarding Donation Request
      </p>
      <div className="flex items-center justify-center mt-7">
        <Link
          to={"/dashboard/my-donation-requests"}
          className="btn btn-outline btn-primary border-rose-500 text-rose-500 hover:bg-rose-600 hover:text-slate-100 duration-150"
        >
          View My All Requests
        </Link>
      </div>
    </div>
  );
};

export default DonationInformation;
