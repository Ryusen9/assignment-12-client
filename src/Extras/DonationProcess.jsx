import React from "react";
import extra1 from "/public/Images/Extra Images/Extra-1.jpg";
import extra2 from "/public/Images/Extra Images/Extra-2.jpg";
import extra3 from "/public/Images/Extra Images/Extra-3.jpg";

const DonationProcess = () => {
  return (
    <div className="p-6 mt-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-2xl font-bold md:text-4xl">How To Donate</p>
        <p className="text-sm">
          The donation process from the time you enter until the time you leave
        </p>
        <div className="my-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="card bg-base-100 shadow-sm">
            <figure>
              <img src={extra1} alt="Shoes" className="h-56 w-full" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Registration!</h2>
              <p>
                You need to complete a very simple regestration from, which
                contains all required contact information to enter in the
                donation process.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-sm">
            <figure>
              <img src={extra2} alt="Shoes" className="h-56 w-full" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Screening</h2>
              <p>
                A drop of blood from your finger will take for simple test to
                ensure that our blood iron levels are proper enough for donation
                process.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-sm">
            <figure>
              <img src={extra3} alt="Shoes" className="h-56 w-full" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Donation</h2>
              <p>
                After ensuring and passed screening test successfully you will
                be directed to a donor bed for donation. It will take only 6–10
                minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationProcess;
