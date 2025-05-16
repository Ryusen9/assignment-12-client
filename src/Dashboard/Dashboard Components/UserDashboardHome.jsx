import React from "react";
import DonationReqHome from "./DonationReqHome";
import DonationInformation from "./DonationInformation";

const UserDashboardHome = () => {
  return (
    <>
      <div className="p-6">
        <DonationReqHome />
      </div>
      <div className="p-6 mt-8">
        <DonationInformation/>
      </div>
    </>
  );
};

export default UserDashboardHome;
