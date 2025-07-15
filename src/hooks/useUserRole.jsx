import React from 'react';
// import { useEffect } from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
// import queryClient from '../api/queryClient';

const useUserRole = () => {
    const {user, authLoading}=useAuth();
    const axiosSecure=useAxiosSecure();
     // Force refetch when user becomes available
  // useEffect(() => {
  //   if (user?.email) {
  //     queryClient.invalidateQueries(['userInfo', user.email]);
  //   }
  // }, [user?.email]);
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
    console.log('roleLoading:', roleLoading, 'userInfo:', userInfo);
    const role=userInfo?.user_by_email?.role || 'user';
    const isUser=role==='user';
    const isCharity=role==='charity';
    const isRestaurant=role==='restaurant';
    const isAdmin=role==='admin'
    return {userInfo, role, roleLoading, isError, error, isUser, isCharity, isRestaurant, isAdmin}
};

export default useUserRole;