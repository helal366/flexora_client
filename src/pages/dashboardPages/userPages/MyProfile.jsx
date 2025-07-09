import React from 'react';
import useAuth from '../hooks/useAuth';
import { FaUserCircle } from 'react-icons/fa';

const MyProfile = () => {
  const { user } = useAuth();

  const joinedDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString()
    : 'N/A';

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex items-center gap-4 mb-6">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="User"
            className="w-24 h-24 rounded-full border-4 border-teal-500 shadow-md"
          />
        ) : (
          <FaUserCircle className="text-7xl text-gray-400" />
        )}
        <div>
          <h2 className="text-2xl font-semibold">{user?.displayName || 'User'}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      <div className="space-y-3">
        {/* Only show role if not "user" */}
        {user?.role && user?.role !== 'user' && (
          <p className="text-sm">
            <span className="font-medium">Role:</span>{' '}
            <span className="badge badge-info">{user.role}</span>
          </p>
        )}
        <p className="text-sm">
          <span className="font-medium">Joined:</span> {joinedDate}
        </p>
      </div>
    </div>
  );
};

export default MyProfile;
