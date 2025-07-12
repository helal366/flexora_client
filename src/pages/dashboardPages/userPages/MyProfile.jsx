import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useUserRole from '../../../hooks/useUserRole';

const MyProfile = () => {
  const { user } = useAuth();
  const {role, userInfo}=useUserRole();
  // console.log('user info from my profile', userInfo)
  const contact=userInfo?.user_by_email?.contact_number;
  // console.log(contact)
  const joinedDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString()
    : 'N/A';

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg shadow-teal-200 rounded-lg mt-10 p-6">
      {/* Profile Picture Centered */}
      <div className="flex justify-center mb-4">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="User"
            className="w-28 h-28 rounded-full border-4 border-teal-500 shadow"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center text-4xl font-bold text-white">
            {user?.displayName?.charAt(0) || 'U'}
          </div>
        )}
      </div>

      {/* Name Centered */}
      <h2 className="text-center text-2xl font-semibold mb-8">{user?.displayName || 'User'}</h2>

      {/* Info Left-Aligned */}
      
      <div className="space-y-2 text-sm text-gray-700">
        {role !== 'user' && (
          <p>
            <span className="font-medium">Role:</span> {role}
          </p>
        )}
        <p>
          <span className="font-medium">Contact Number:</span> {contact || 'N/A'}
        </p>
        <p>
          <span className="font-medium">Email:</span> {user?.email || 'N/A'}
        </p>
        <p>
          <span className="font-medium">Joined at:</span> {joinedDate}
        </p>
        {/* Role shown only if not a regular user */}
        
      </div>
    </div>
  );
};

export default MyProfile;
