import React from "react";
import { GiHeartDrop, GiTimeTrap } from "react-icons/gi";
import { PiHandHeart, PiHandshake } from "react-icons/pi";

const DonationReason = () => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto pt-6">
        <p className="text-2xl font-bold md:text-4xl">Why Donate Blood?</p>
        <div className="mt-6">
          <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <li className="overflow-hidden">
              <div className="p-6 h-64 border border-slate-200 rounded-xl flex flex-col gap-4">
                <div className="text-rose-500 text-4xl">
                  <PiHandHeart />
                </div>
                <div>
                  <p className="text-lg font-medium">Saving Lives</p>
                </div>
                <div>
                  <p className="text-xs md:text-sm h-24 overflow-auto pr-2">
                    One of the most important reasons to donate blood is that it
                    saves lives. Blood donations are essential for treating
                    patients in emergencies (such as accidents), surgeries,
                    childbirth complications, cancer treatments, and for those
                    with chronic conditions like anemia. Regular blood supply
                    ensures that hospitals are prepared for unforeseen crises,
                    natural disasters, and large-scale emergencies. Every
                    donation can make the difference between life and death,
                    offering hope and a second chance to those in critical need.
                  </p>
                </div>
              </div>
            </li>
            <li className="lg:col-span-2">
              <div className="p-6 border h-64 border-slate-200 rounded-xl flex flex-col gap-4">
                <div className="text-rose-500 text-4xl">
                  <GiTimeTrap />
                </div>
                <div>
                  <p className="text-lg font-medium">Meeting Constant Demand</p>
                </div>
                <div>
                  <p className="text-xs md:text-sm h-24 overflow-auto pr-2">
                    Hospitals and clinics are always in need of blood. Blood has
                    a limited shelf life (around 42 days for red blood cells),
                    and there is a constant demand for new donations to ensure a
                    steady supply.
                  </p>
                </div>
              </div>
            </li>
            <li className="lg:col-span-2 lg:h-full">
              <div className="p-6 border h-64 border-slate-200 rounded-xl flex flex-col gap-4">
                <div className="text-rose-500 text-4xl">
                  <PiHandshake />
                </div>
                <div>
                  <p className="text-lg font-medium">Helping Those in Need</p>
                </div>
                <div>
                  <p className="text-xs md:text-sm h-24 overflow-auto pr-2">
                    Blood donations can help a wide range of patients, from
                    premature babies needing blood transfusions to those
                    undergoing chemotherapy or requiring organ transplants. It’s
                    also critical for treating burn victims or people suffering
                    from severe trauma.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="p-6 border h-64 border-slate-200 rounded-xl flex flex-col gap-4">
                <div className="text-rose-500 text-4xl">
                  <GiHeartDrop />
                </div>
                <div>
                  <p className="text-lg font-medium">
                    Health Benefits for Donors
                  </p>
                </div>
                <div>
                  <p className="text-xs md:text-sm h-24 overflow-auto pr-2">
                    While donating blood helps others, it can also benefit the
                    donor. Regular donation can help improve circulation, reduce
                    iron levels (which may lower the risk of heart disease), and
                    give donors a sense of fulfillment from helping others.
                    Additionally, the mini health check-up performed before
                    every donation—including blood pressure, pulse, and
                    hemoglobin levels—can help donors stay informed about their
                    health. Some studies suggest that regular blood donation may
                    even contribute to reduced oxidative stress and promote a
                    healthier lifestyle overall. Beyond the physical benefits,
                    the emotional satisfaction of knowing you've made a real
                    difference can significantly boost mental well-being and
                    create a stronger sense of community and compassion.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DonationReason;
