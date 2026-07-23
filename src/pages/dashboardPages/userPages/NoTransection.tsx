import React from 'react';
import { FaMoneyCheckAlt } from 'react-icons/fa';

const NoTransection = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] text-center bg-gray-100 rounded-xl shadow-md p-6">
      <FaMoneyCheckAlt className="text-6xl text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-600 mb-2">No Transaction History</h2>
      <p className="text-gray-500">You haven’t made any charity role payments yet.</p>
    </div>
  );
};

export default NoTransection;
