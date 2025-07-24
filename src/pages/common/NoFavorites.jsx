import React from 'react';
import { FaHeartBroken } from 'react-icons/fa';

const NoFavorites = () => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center text-gray-600 py-10">
      <FaHeartBroken className="text-5xl text-teal-400 mb-4" />
      <h3 className="text-xl font-semibold mb-2">No Favorites Yet</h3>
      <p className="text-center max-w-md">
        You haven't added any favorite donations yet. Explore available donations and save the ones you love!
      </p>
    </div>
  );
};

export default NoFavorites;
