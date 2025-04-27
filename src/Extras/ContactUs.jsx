import React from "react";
import { Helmet } from "react-helmet";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <>
      <Helmet>
        <title>BloodBond | Contact Us</title>
        <meta name="description" content="Get in touch with BloodBond team" />
      </Helmet>

      <section className="min-h-screen bg-base-200 flex items-center justify-center px-6 py-16">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Info Section */}
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-rose-600 mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Have any questions? Need help or want to become a donor?  
              We'd love to hear from you! Reach out to us anytime.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-rose-500 text-2xl" />
                <span className="text-gray-600">+1 (123) 456-7890</span>
              </div>
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-rose-500 text-2xl" />
                <span className="text-gray-600">support@bloodbond.com</span>
              </div>
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-rose-500 text-2xl" />
                <span className="text-gray-600">123 Life Street, Hope City</span>
              </div>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="card w-full bg-base-100 shadow-2xl p-8">
            <form className="flex flex-col gap-6">
              {/* Name */}
              <div className="form-control flex flex-col">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered"
                  required
                />
              </div>

              {/* Email */}
              <div className="form-control flex flex-col">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered"
                  required
                />
              </div>

              {/* Message */}
              <div className="form-control flex flex-col">
                <label className="label">
                  <span className="label-text">Message</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Type your message here..."
                  rows="5"
                  required
                ></textarea>
              </div>

              {/* Submit */}
              <div className="form-control mt-4">
                <button className="btn btn-primary bg-rose-500 border-none shadow-rose-300 w-full">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
