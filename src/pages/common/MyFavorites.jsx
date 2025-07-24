import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MyFavorites = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const userEmail=user?.email;
    const {data: favorites, isLoading}=useQuery({
        
    })
    return (
        <div>
            
        </div>
    );
};

export default MyFavorites;