import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {
    const {user, authLoading}=useAuth();
    const axiosSecure=useAxiosSecure();
    const {data: role, isPending:roleLoading, isError, error}=useQuery(
        {
            queryKey: ['user-role', user?.email],
            enabled: !!user?.email && !authLoading,
            queryFn: async()=>{
                const res=await axiosSecure.get(`/users/role?email=${user?.email}`);
                return res?.data?.role;
            }
        }
    )
    return {role, roleLoading, isError, error}
};

export default useUserRole;