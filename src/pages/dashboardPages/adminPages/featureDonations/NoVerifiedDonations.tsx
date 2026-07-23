import { FaBoxOpen } from 'react-icons/fa';
import React from 'react';

const NoVerifiedDonations = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-600">
      <FaBoxOpen className="text-6xl text-orange-400 mb-4" />
      <h2 className="text-xl font-semibold">No Verified Donations Found</h2>
      <p className="text-sm text-gray-500 mt-2">Please check back later or verify a donation to see it here.</p>
    </div>
  );
};

export default NoVerifiedDonations;
