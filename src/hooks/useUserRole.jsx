import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {
    const {user, authLoading}=useAuth();
    const axiosSecure=useAxiosSecure();
    const {data: userInfo, isPending:roleLoading, isError, error}=useQuery(
        {
            queryKey: ['userInfo', user?.email],
            enabled: !!user?.email && !authLoading,
            queryFn: async()=>{
                const res=await axiosSecure.get(`/users?email=${user?.email}`);
                console.log('response', res)
                return res?.data;
            }
        }
    );
    const role=userInfo?.role
    const isUser=role==='user';
    const isCharity=role==='charity';
    const isRestaurant=role==='restaurant';
    const isAdmin=role==='admin'
    return {userInfo, role, roleLoading, isError, error, isUser, isCharity, isRestaurant, isAdmin}
};

export default useUserRole;