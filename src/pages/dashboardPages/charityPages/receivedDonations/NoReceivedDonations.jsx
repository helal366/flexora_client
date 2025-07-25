import React from 'react';
import { FaInbox, FaGift, FaSmile } from 'react-icons/fa';

const NoReceivedDonations = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="bg-gradient-to-br from-purple-100 to-pink-200 text-purple-900 shadow-2xl rounded-2xl p-8 max-w-md text-center">
        <div className="flex justify-center mb-4">
          <FaInbox size={48} className="text-purple-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2 flex justify-center items-center gap-2">
          <FaGift size={22} className="text-pink-600" />
          No Received Donations
        </h2>
        <p className="mb-4 text-sm text-purple-800">
          You haven’t received any food donations yet. Once your requested items are picked up and confirmed, they'll appear here.
        </p>
        <div className="flex justify-center">
          <FaSmile size={30} className="text-yellow-500" />
        </div>
      </div>
    </div>
  );
};

export default NoReceivedDonations;
