import React from "react";
import { FaBoxOpen, FaSmileBeam } from "react-icons/fa";
import { MdOutlineEmojiFoodBeverage } from "react-icons/md";

const NoPickedUpDonations = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 bg-gradient-to-r from-pink-100 via-yellow-100 to-green-100 rounded-lg shadow-md">
      <FaBoxOpen className="text-6xl text-pink-500 mb-4 animate-bounce" />
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        No Picked Up Donations Yet
      </h3>
      <p className="text-gray-600 max-w-md mb-4">
        It looks like no donations have been picked up so far. Once restaurants
        donate and charities confirm pickup, you’ll see them listed here!
      </p>
      <div className="flex gap-6 text-4xl">
        <MdOutlineEmojiFoodBeverage className="text-yellow-500 animate-pulse" />
        <FaSmileBeam className="text-green-500 animate-spin-slow" />
      </div>
    </div>
  );
};

export default NoPickedUpDonations;
