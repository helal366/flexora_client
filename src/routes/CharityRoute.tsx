import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import Loading from '../components/loadingComponents/Loading';
import { Navigate } from 'react-router';

const CharityRoute = ({children}:{children: React.ReactNode}) => {
     const {user, authLoading}=useAuth();
    const {roleLoading, isCharity}=useUserRole();
    if(authLoading || roleLoading) {
        return <Loading/>
    }
    if(!user || !isCharity){
        return <Navigate to='/forbidden' />
    }
    return children;
};

export default CharityRoute;