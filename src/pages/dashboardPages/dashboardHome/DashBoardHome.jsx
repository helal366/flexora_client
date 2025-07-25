import React from 'react';
import { FaUserTie, FaHandsHelping, FaUtensils, FaSpinner, FaRegSmileBeam } from 'react-icons/fa';
import useUserRole from '../../../hooks/useUserRole';
import Loading from '../../../components/loadingComponents/Loading';

const DashBoardHome = () => {
  const { role, roleLoading, userInfo } = useUserRole();

  if (roleLoading) return <Loading />;

  const roleMap = {
    admin: {
      label: 'Admin',
      icon: <FaUserTie size={50} className="text-purple-600" />,
      bg: 'bg-purple-100',
    },
    charity: {
      label: 'Charity Representative',
      icon: <FaHandsHelping size={50} className="text-green-600" />,
      bg: 'bg-green-100',
    },
    restaurant: {
      label: 'Restaurant Representative',
      icon: <FaUtensils size={50} className="text-orange-600" />,
      bg: 'bg-orange-100',
    },
    user: {
      label: 'Regular User',
      icon: <FaRegSmileBeam size={50} className="text-blue-600" />,
      bg: 'bg-blue-100',
    },
  };

  const current = roleMap[role] || roleMap['user'];

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[60vh] p-6 text-center rounded-xl shadow-md ${current.bg}`}
    >
      {current.icon}
      <h1 className="text-3xl font-bold mt-4 text-gray-800">Welcome to your Dashboard!</h1>
      <p className="text-lg text-gray-700 mt-2">
        You are logged in as: <span className="font-semibold">{current.label}</span>
      </p>
      <p className="mt-1 text-gray-600">Navigate using the sidebar to manage your activities.</p>

      {userInfo?.user_by_email?.displayName && (
        <p className="mt-2 text-sm text-gray-500">
          Logged in as <strong>{userInfo.user_by_email.displayName}</strong>
        </p>
      )}
    </div>
  );
};

export default DashBoardHome;
