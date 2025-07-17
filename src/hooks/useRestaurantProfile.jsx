// hooks/useRestaurantProfile.js
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRestaurantProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, authLoading } = useAuth();

  const {
    data: restaurantProfile,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['restaurantProfile', user?.email],
    enabled: !!user?.email && !authLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user.email}`);
      return res.data?.user_by_email; // expects user object
    },
  });

  return { restaurantProfile, isLoading, isError, error };
};

export default useRestaurantProfile;
