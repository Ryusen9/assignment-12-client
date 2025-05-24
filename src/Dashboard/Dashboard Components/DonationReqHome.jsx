import React, { useContext, useEffect, useState } from "react";
import Context from "../../Context/Context";
import axios from "axios";

const DonationReqHome = () => {
  const { user } = useContext(Context);
  const [donationRequests, setDonationRequests] = useState([]);
  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
    if (user?.email) {
      axios
        .get(
          `https://server-theta-virid.vercel.app/donation-requests?email=${
            user.email
          }&sortOrder=${"newest"}&limit=${3}`, {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data) setDonationRequests(res.data.data);
        });
    }
  }, []);
  return (
    <div className="min-h-full">
      <p className="text-center text-xl md:text-2xl lg:text-4xl font-bold mb-6">
        My Top Donation Requests.
      </p>
      <div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Requested By</th>
                <th>Hospital</th>
                <th>Blood Group</th>
                <th>Donation Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {donationRequests?.map((request, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{request?.name}</td>
                  <td>{request?.hospital_name}</td>
                  <td>{request?.bloodGroup}</td>
                  <td>{request?.donation_date}</td>
                  <td>{request?.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DonationReqHome;
