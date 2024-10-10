import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-8 border-t border-lightgrey bg-white">
      <div className="flex flex-wrap justify-center mb-6">
        <a href="#" className="mx-3">
          <FontAwesomeIcon icon={faInstagram} className="text-2xl hover:text-red-600 transition-colors" />
        </a>
        <a href="#" className="mx-3">
          <FontAwesomeIcon icon={faFacebook} className="text-2xl hover:text-blue-600 transition-colors" />
        </a>
        <a href="#" className="mx-3">
          <FontAwesomeIcon icon={faTwitter} className="text-2xl hover:text-blue-600 transition-colors" />
        </a>
        <a href="#" className="mx-3">
          <FontAwesomeIcon icon={faYoutube} className="text-2xl hover:text-red-700 transition-colors" />
        </a>
      </div>
      <p className="mx-auto mb-4 text-center text-base w-full max-w-[534px]">
        주식회사 : 냉장고에 뭐 있어?
      </p>
      <p className="text-center text-gray-500">
        &copy; 2024 What’s in your fridge. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
