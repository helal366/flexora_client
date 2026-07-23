import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { UserCredential } from "firebase/auth";

// Errors 1, 2, 3: Defined strict types for component props
interface GoogleLoginProps {
    desire?: string | null;
    registerLoading?: boolean;
    isLogging?: boolean;
}

// Defined structural interface for your MongoDB user payload to solve error 7
interface MongoUserPayload {
    name: string | null;
    email: string | null;
    photoURL: string | null;
    role: string;
    contact_number: string;
    created_at: string;
    last_login: string;
    uid: string;
}
const GoogleLogin = ({ desire, registerLoading = false, isLogging = false }:GoogleLoginProps) => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [googleLoading, setGoogleLoading] = useState(false)

     // Error 4: Checked and handled the null state for context safely
    const authContext = useAuth();
    if (!authContext) {
        return null; 
    }
    const { googleLogin } = authContext;

     // Error 5 & 7: Explicitly typed mutation variables and Axios error responses
    const addUserToMongodbMutation = useMutation<AxiosResponse, AxiosError<{ message?: string }>, MongoUserPayload>({
        mutationFn: (userInfo) => axiosSecure.post(`/users/`, userInfo),
        onSuccess: () => {
            Swal.fire({
                icon: "success",
                title: "Logged in!",
                text: "User info saved to database.",
                timer: 2000,
                showConfirmButton: false,
            });
            if (desire) navigate(desire);
        },
        onError: (err) => {
            Swal.fire({
                icon: "error",
                title: "Database Save Failed",
                text: err?.response?.data?.message || err?.message || "Something went wrong.",
                showConfirmButton: true,
            });
        },
    });

    // Error 6: Added explicit type arguments to map UserCredential response outputs
    const googleLoginMutation = useMutation<UserCredential, Error, void>({
        mutationFn: () => googleLogin(),
        onSuccess: async (result) => {
            const regUser = result?.user;
            if (!regUser) {
                return
            }

            const userInfo = {
                name: regUser?.displayName,
                email: regUser?.email,
                photoURL: regUser?.photoURL,
                role: 'user',
                contact_number: 'not_available',
                created_at: new Date().toISOString(),
                last_login: new Date().toISOString(),
                uid: regUser?.uid
            }
            addUserToMongodbMutation.mutate(userInfo)
        },
        onError: (err) => {
            Swal.fire({
                icon: "error",
                title: err?.message || 'Something went wrong.',
                timer: 2000
            })
        }
    })
    const handleGoogleSignin = () => {
        setGoogleLoading(true)
        googleLoginMutation.mutate(undefined, {
            onSettled: () => setGoogleLoading(false),
        })
    };
      // Errors 8 & 9: Swapped deprecated .isLoading property out for TanStack v5's .isPending
      const isLoading = 
        googleLoading || 
        googleLoginMutation.isPending || 
        addUserToMongodbMutation.isPending || 
        registerLoading || 
        isLogging;
    // const isLoading = googleLoading || googleLoginMutation.isLoading || addUserToMongodbMutation.isLoading || registerLoading || isLogging;

    return (
        <div>
            <div className="divider divider-success">Or</div>
            <button
                disabled={isLoading}
                onClick={handleGoogleSignin}
                className="btn bg-gray-800 text-gray-100 hover:bg-teal-700 disabled:text-gray-700 border-[#e5e5e5] w-full ">
                <FcGoogle size={20} />&nbsp;
                {isLoading ? (
                    <>
                        <span className="loading loading-spinner loading-xs mr-1"></span> Signing in...
                    </>
                ) : 'Continue with Google'}
            </button>
        </div>
    );
};

export default GoogleLogin;
