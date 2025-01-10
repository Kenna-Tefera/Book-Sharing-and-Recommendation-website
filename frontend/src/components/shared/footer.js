

import React from "react";
import { FaHome, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLink } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">About Us</h3>
            <p className="text-sm">
            We are committed to building a vibrant literary community, empowering users to share, explore, and connect through their love of books. </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2 flex items-center">
                <FaHome className="mr-2" />
                <a href="#" className="hover:text-white">Home</a>
              </li>
              <li className="mb-2 flex items-center">
                <FaLink className="mr-2" />
                <a href="#" className="hover:text-white">Services</a>
              </li>
              <li className="mb-2 flex items-center">
                <FaLink className="mr-2" />
                <a href="#" className="hover:text-white">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
            <p className="text-sm flex items-center">
              <FaEnvelope className="mr-2" /> Email: Booksharing@example.com
            </p>
            <p className="text-sm mt-2 flex items-center">
              <FaPhone className="mr-2" /> Phone: +251-------
            </p>
            <p className="text-sm mt-2 flex items-center">
              <FaMapMarkerAlt className="mr-2" /> Address: Addis Ababa
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

