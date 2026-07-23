import React from 'react';
import { FaBoxOpen } from 'react-icons/fa';

const NoFeaturedDonations = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
      <FaBoxOpen className="text-6xl mb-4" />
      <h2 className="text-xl font-semibold mb-2">No Featured Donations Found</h2>
      <p className="text-center max-w-sm">
        Sorry, there are currently no featured food donations available. Please check back later.
      </p>
    </div>
  );
};

export default NoFeaturedDonations;
