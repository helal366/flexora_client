import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../components/loadingComponents/Loading';

const PrivateRoute = ({children}) => {
    const location=useLocation();
    const {user, authLoading}=useAuth();
    if(authLoading){
        return <Loading/>
    }
    if(!user){
        <Navigate 
        to='/auth/login'
        replace
        state={{desire: location.pathname}} />
    }
    return children;
};

export default PrivateRoute;