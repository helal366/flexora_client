import React, { useEffect, useState } from 'react';
import SignUp from '../lotties/register/SignUp';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from './../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import GoogleLogin from '../components/loginRegisterComponents/GoogleLogin';
const LoginPage = () => {
    const { userLogin } = useAuth();
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm({ criteriaMode: 'all' });
    const axiosSecure = useAxiosSecure();
    const location=useLocation();
    const desire=location?.desire? location?.desire : '/';
    const [isLogging, setIsLogging]=useState(false)
    const [loginError,setLoginError]=useState('')
     useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    const userLoginMutation = useMutation({
        mutationFn: (email) => axiosSecure.patch(`/users/last-login`, { email, last_login: new Date().toISOString() }),
        onSuccess: () => {
            console.log('Last login updated.')
        },
        onError: (err) => {
            console.log('Failed to update last login', err?.message);
        }
    })
    const onSubmit = async (data) => {
        setIsLogging(true);
        setLoginError(''); // reset previous errors
        try {
            // user login
             await userLogin(data?.email, data?.password);
            // success message
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'You have successfully logged in.',
                timer: 1500
            });
            // wait for the last login time update before navigating
            await userLoginMutation.mutateAsync(data?.email);
            // then navigate
            if(desire) navigate(desire);
        } catch (error) {
             // Handle specific auth errors
        if (error?.code === 'auth/invalid-credential') {
            setLoginError('Email or password doesn’t match any account.');
            Swal.fire({
                icon: 'error',
                title: 'Logged in failed!',
                text: `Email or password doesn’t match any account.`,
                showConfirmButton: true
            })
        }else {
            setLoginError('Login failed. Please try again.');
            Swal.fire({
                icon: 'error',
                title: 'Logged in failed!',
                text: `Login failed. Please try again.`,
                showConfirmButton: true
            })
        }            
        }finally{
            setIsLogging(false)
        }
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="hidden lg:block">
                    <SignUp />
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-3xl font-bold text-center mb-2">Welcome back!</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className="fieldset">

                                {/* email */}
                                <label className="label">Email</label>
                                <input type="email" {...register("email", { required: true })} className="input" placeholder="Email" />
                                {errors.email?.type === 'required' && <p className='text-red-600 text-xs'>Email is required</p>}

                                {/* password */}
                                <label className="label">Password</label>
                                <input className='px-4 py-2'
                                    placeholder='******'
                                    type="password"
                                    {...register('password', {
                                        required: 'Password is required',
                                    })}
                                />
                                {errors.password && (
                                    <p className="text-red-600 text-xs">{errors.password.message}</p>
                                )}
                                <button className="btn btn-neutral mt-4 hover:bg-teal-800">
                                    {
                                        isLogging || userLoginMutation.isPending ?(
                                        <>
                                            <span className="loading loading-spinner loading-xs mr-1"></span> Logging in...
                                        </>
                                    ) : 'Login'
                                    }
                                </button>
                                {
                                    loginError && <p className='text-xs text-red-600'>{loginError}</p>
                                }
                            </fieldset>
                        </form>
                        <GoogleLogin desire={desire} isLogging={isLogging}/>
                        <p>Don't have an account? Please <Link to='/auth/register' className='text-blue-600 underline'>Register </Link> </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;