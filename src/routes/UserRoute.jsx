import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import Loading from '../components/loadingComponents/Loading';

const UserRoute = ({children}) => {
    const {user, authLoading}=useAuth();
    const {roleLoading, isUser}=useUserRole();
    if(authLoading || roleLoading) {
        return <Loading/>
    }
    return children;
};

export default UserRoute;