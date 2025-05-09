import React from "react";
import Hero from "../Hero/Hero";
import DonationReason from "../Extras/DonationReason";
import DonationProcess from "../Extras/DonationProcess";
import FixedBackground from "../Shared/FixedBackground";
import { MdOutlineVolunteerActivism } from "react-icons/md";
import volunteerImage from "/public/Images/Shared Images/volunteer.jpg";
import RegisterFormHome from "../Components/Register/RegisterFormHome";
import { Helmet } from "react-helmet";

const HomeLayout = () => {
  return (
    <>
      <Helmet>
        <title>BloodBond | Home</title>
      </Helmet>
      <Hero />
      <DonationReason />
      <DonationProcess />
      <FixedBackground
        title={"Join With Us and Save Life"}
        buttonContent={"Become Volunteer"}
        buttonIcon={<MdOutlineVolunteerActivism />}
        bgImage={volunteerImage}
        h={"h-[65vh]"}
        textColor={"text-black"}
        id={"#volunteer-form"}
      />
      <RegisterFormHome />
    </>
  );
};

export default HomeLayout;
