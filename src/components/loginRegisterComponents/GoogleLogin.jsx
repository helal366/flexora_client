import React from "react";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";


const GoogleLogin = ({ desire, registerLoading, isLogging }) => {
    const navigate = useNavigate()
    const { googleLogin } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [googleLoading, setGoogleLoading] = useState(false)


    const addUserToMongodbMutation = useMutation({
        mutationFn: (userInfo) => axiosSecure.post(`/users/`, userInfo),
        onSuccess: () => {
            // console.log('User info saved to DB:', res.data);
            // setGoogleLoading(false)
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
    })
    const googleLoginMutation = useMutation({
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
    const isLoading = googleLoading || googleLoginMutation.isLoading || addUserToMongodbMutation.isLoading || registerLoading || isLogging;

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
