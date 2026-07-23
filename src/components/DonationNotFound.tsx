import React from 'react';

const DonationNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
      <svg
        className="w-16 h-16 text-red-400 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.664 1.732-3L13.732 4c-.77-1.336-2.694-1.336-3.464 0L4.34 16c-.77 1.336.192 3 1.732 3Z"
        />
      </svg>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Donation Not Found</h2>
      <p className="text-gray-500 text-sm">
        Sorry, the donation you’re looking for doesn’t exist or may have been removed.
      </p>
    </div>
  );
};

export default DonationNotFound;
