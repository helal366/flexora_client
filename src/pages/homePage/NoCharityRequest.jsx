import React from 'react';
import { FaRegSadCry } from 'react-icons/fa';

const NoCharityRequest = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-center bg-orange-100 p-6 rounded-lg shadow-md">
      <FaRegSadCry className="text-5xl text-orange-500 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        No Charity Requests Found
      </h2>
      <p className="text-gray-600">
        You haven’t submitted any charity requests for donations yet.
      </p>
    </div>
  );
};

export default NoCharityRequest;
