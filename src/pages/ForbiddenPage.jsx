import React from 'react';
import { MdBlock } from 'react-icons/md'; // forbidden / block icon
import { Link } from 'react-router-dom';

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-base-200 px-4">
      <MdBlock className="text-red-500 text-7xl mb-4 drop-shadow-md" />
      <h1 className="text-4xl font-bold mb-2 text-red-600">Access Denied</h1>
      <p className="text-gray-700 mb-6 max-w-md">
        You don’t have permission to access this page. This section is restricted to authorized users only.  
      </p>
      <Link
        to="/"
        className="btn btn-outline btn-error shadow-md hover:shadow-lg"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default ForbiddenPage;
