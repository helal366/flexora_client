import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import Loading from '../components/loadingComponents/Loading';
import { Navigate } from 'react-router';

const UserRoute = ({children}) => {
    const {user, authLoading}=useAuth();
    const {roleLoading, isUser}=useUserRole();
    if(authLoading || roleLoading) {
        return <Loading/>
    }
    if(!user || !isUser){
        return <Navigate to='/forbidden' />
    }
    return children;
};

export default UserRoute;