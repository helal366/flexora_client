import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

// 1. Define the return interface so TypeScript can autocomplete your roles safely
interface UserRoleHookResult {
  userInfo: any;
  role: string;
  roleLoading: boolean;
  isError: boolean;
  error: Error | null;
  isUser: boolean;
  isCharity: boolean;
  isRestaurant: boolean;
  isAdmin: boolean;
}

const useUserRole = ():UserRoleHookResult => {
  const authContent = useAuth();
  const axiosSecure = useAxiosSecure();
  // 2. Fixed: Return a safe state object instead of <Loading /> JSX
  if (!authContent) {
    return {
      userInfo: null,
      role: "user",
      roleLoading: true,
      isError: false,
      error: null,
      isUser: true,
      isCharity: false,
      isRestaurant: false,
      isAdmin: false,
    };
  }
  const { user } = authContent;

  const {
    data: userInfo,
    isPending: roleLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      // Guard against null email inside the query function
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/user?email=${user?.email}`);
      return res?.data;
    },
    refetchOnWindowFocus: true,
    retry: 2,
    enabled: !!user?.email,
  });
  const role = userInfo?.user_by_email?.role || "user";
  const isUser = role === "user";
  const isCharity = role === "charity";
  const isRestaurant = role === "restaurant";
  const isAdmin = role === "admin";
  return {
    userInfo,
    role,
    roleLoading,
    isError,
    error,
    isUser,
    isCharity,
    isRestaurant,
    isAdmin,
  };
};

export default useUserRole;
