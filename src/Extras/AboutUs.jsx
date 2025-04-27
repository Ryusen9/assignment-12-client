import React from "react";
import { Helmet } from "react-helmet";
import { FaUsers, FaHeart, FaHandsHelping } from "react-icons/fa";

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>BloodBond | About Us</title>
        <meta name="description" content="Learn more about BloodBond" />
      </Helmet>

      <section className="min-h-screen bg-base-200 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-7xl w-full flex flex-col items-center text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-rose-600 mb-4">
            About BloodBond
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl">
            BloodBond is a life-saving platform built to connect blood donors
            with those in urgent need. We believe in the power of community,
            compassion, and connection to make a real difference.
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 w-full">
            {/* Card 1 */}
            <div className="card bg-base-100 shadow-xl p-6 hover:scale-105 transition-transform">
              <div className="flex flex-col items-center">
                <FaUsers className="text-5xl text-rose-500 mb-4" />
                <h2 className="card-title">Our Community</h2>
                <p className="text-gray-500 mt-2">
                  Thousands of volunteers and donors working together for a
                  healthier tomorrow.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="card bg-base-100 shadow-xl p-6 hover:scale-105 transition-transform">
              <div className="flex flex-col items-center">
                <FaHeart className="text-5xl text-rose-500 mb-4" />
                <h2 className="card-title">Our Mission</h2>
                <p className="text-gray-500 mt-2">
                  To make blood accessible to everyone in need, anytime,
                  anywhere.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="card bg-base-100 shadow-xl p-6 hover:scale-105 transition-transform">
              <div className="flex flex-col items-center">
                <FaHandsHelping className="text-5xl text-rose-500 mb-4" />
                <h2 className="card-title">Our Values</h2>
                <p className="text-gray-500 mt-2">
                  Empathy, reliability, transparency, and the drive to save
                  lives.
                </p>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="mt-12">
            <button className="btn btn-primary bg-rose-500 border-none shadow-rose-200 px-8 py-3 text-lg">
              Join Our Mission
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
