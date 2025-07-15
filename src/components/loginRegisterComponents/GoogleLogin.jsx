import React, { useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";


const GoogleLogin = ({ desire }) => {
    const navigate = useNavigate()
    const { googleLogin } = useAuth()
    const [loading, setLoading] = useState(false);
    const handleGoogleSignin = () => {
        setLoading(true)
        googleLogin()
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Google Login Successful",
                    timer: 2000
                });
                navigate(desire)
            }).catch(err => {
                Swal.fire({
                    icon: "error",
                    title: err.message,
                    timer: 2000
                })
            }).finally(() => setLoading(false))
    }
    return (
        <div>
            <div className="divider divider-success">Or</div>
            <button
                disabled={loading}
                onClick={handleGoogleSignin}
                className="btn bg-gray-800 text-gray-100 hover:bg-teal-700 disabled:text-gray-700 border-[#e5e5e5] w-full ">
                <FcGoogle size={20} />&nbsp;
                {loading ? (
                    <>
                        <span className="loading loading-spinner loading-xs mr-1"></span> Logging in...
                    </>
                ) : 'Login with Google'}
            </button>
        </div>
    );
};

export default GoogleLogin;
