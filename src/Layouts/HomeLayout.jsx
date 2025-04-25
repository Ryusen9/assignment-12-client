import React from "react";
import Hero from "../Hero/Hero";
import DonationReason from "../Extras/DonationReason";
import DonationProcess from "../Extras/DonationProcess";

const HomeLayout = () => {
  return (
    <>
      <Hero />
      <DonationReason/>
      <DonationProcess/>
    </>
  );
};

export default HomeLayout;
