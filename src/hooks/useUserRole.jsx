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
            queryFn: async()=>{
                const res=await axiosSecure.get(`/user?email=${user?.email}`);
                // console.log('response', res)
                return res?.data;
            },
            refetchOnWindowFocus: true,
            retry: 2,
            enabled: !!user?.email && !authLoading,
        }
    );
    // console.log('roleLoading:', roleLoading, 'userInfo:', userInfo);
    const role=userInfo?.user_by_email?.role || 'user';
    const isUser=role==='user';
    const isCharity=role==='charity';
    const isRestaurant=role==='restaurant';
    const isAdmin=role==='admin'
    return {userInfo, role, roleLoading, isError, error, isUser, isCharity, isRestaurant, isAdmin}
};

export default useUserRole;