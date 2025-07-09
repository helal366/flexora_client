import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../components/loadingComponents/Loading';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, authLoading } = useAuth();
  if (authLoading) {
    return <Loading />
  }
   if (!user) {
    return (
      <Navigate
        to="/auth/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

export default PrivateRoute;