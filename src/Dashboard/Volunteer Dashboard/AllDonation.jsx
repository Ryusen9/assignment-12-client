import React, { useContext, useEffect, useState } from "react";
import Context from "../../Context/Context";
import axios from "axios";

const AllDonation = () => {
  const { user } = useContext(Context);
  const [donationReqs, setDonationReqs] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `https://server-theta-virid.vercel.app/volunteers-donations?${user?.email}`
        )
        .then((res) => {
          if (res.data) {
            setDonationReqs(res.data);
          }
        });
    }
  }, []);
  return (
    <div className="p-6 flex flex-col items-center min-w-full h-full">
      <p className="text-center text-lg md:text-2xl lg:text-4xl font-bold mb-7">
        ALL DONATION REQUESTS
      </p>
      <div className="w-full h-full">
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Recipient Name</th>
                <th>Blood Group</th>
                <th>Hospital Name</th>
                <th>Address</th>
                <th>Donation Date</th>
              </tr>
            </thead>
            <tbody>
              {donationReqs.map((request, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{request.req.recipient_name}</td>
                  <td>{request.req.bloodGroup}</td>
                  <td>{request.req.hospital_name}</td>
                  <td>{request.req.full_address}</td>
                  <td>{request.req.donation_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllDonation;
