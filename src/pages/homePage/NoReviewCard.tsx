import React from 'react';

const NoReviewCard = () => {
  return (
    <div className="my-6">
      <div className="card bg-base-100 shadow-md border">
        <div className="card-body items-center text-center">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.584 9-8s-4.03-8-9-8-9 3.584-9 8c0 2.053.82 3.933 2.174 5.345-.088.815-.375 2.063-1.056 3.405 0 0-.015.03-.024.042a.564.564 0 0 0 .694.827l.042-.015c1.357-.5 2.565-1.148 3.604-1.872A10.53 10.53 0 0 0 12 20.25Z"
            />
          </svg>
          <h2 className="text-lg font-semibold mt-3">No reviews yet</h2>
          <p className="text-sm text-gray-500">Be the first to leave a review for this donation.</p>
        </div>
      </div>
    </div>
  );
};

export default NoReviewCard;
