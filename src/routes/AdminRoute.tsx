import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';

const AdminRoute = ({children}) => {
     const {user, authLoading}=useAuth();
    const {roleLoading, isAdmin}=useUserRole();
    if(authLoading || roleLoading) {
        return <Loading/>
    }
    if(!user || !isAdmin){
        return <Navigate to='/forbidden' />
    }
    return children;
};

export default AdminRoute;