import React from 'react';
import { MdOutlineNoMeals, MdOutlineLocalDining } from 'react-icons/md';
import { FaHandsHelping } from 'react-icons/fa';

const NoAvailableDonations = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="bg-gradient-to-br from-blue-100 to-cyan-200 text-blue-900 shadow-2xl rounded-2xl p-8 max-w-md text-center">
        <div className="flex justify-center mb-4">
          <MdOutlineNoMeals size={50} className="text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2 flex justify-center items-center gap-2">
          <MdOutlineLocalDining size={22} className="text-cyan-600" />
          No Donations Available to Pick Up
        </h2>
        <p className="mb-4 text-sm text-blue-800">
          Currently, there are no donations available for pickup. Please check back soon or explore other sections.
        </p>
        <div className="flex justify-center">
          <FaHandsHelping size={28} className="text-green-500" />
        </div>
      </div>
    </div>
  );
};

export default NoAvailableDonations;
