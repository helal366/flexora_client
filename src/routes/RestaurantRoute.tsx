import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';

const RestaurantRoute = ({children}) => {
   const {user, authLoading}=useAuth();
    const {roleLoading, isRestaurant}=useUserRole();
    if(authLoading || roleLoading) {
        return <Loading/>
    }
    if(!user || !isRestaurant){
        return <Navigate to='/forbidden' />
    }
    return children;
};

export default RestaurantRoute;