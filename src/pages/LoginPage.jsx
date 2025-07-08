import React from 'react';
import SignUp from '../lotties/register/SignUp';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from './../hooks/useAxiosSecure';
import { useMutation } from './../../node_modules/@tanstack/react-query/src/useMutation';

const LoginPage = () => {
    const {userLogin}=useAuth();
    const navigate=useNavigate();
    const {register, formState: {errors}, handleSubmit}=useForm({criteriaMode: 'all'});
    const axiosSecure=useAxiosSecure();

    const userLoginMutation=useMutation({
        mutationFn: (email)=>axiosSecure.patch(`/users/last-login`, {email, last_login:new Date().toISOString()}),
        onSuccess: ()=>{
            console.log('Last login updated.')
        },
        onError: (err)=>{
            console.log('Failed to update last login', err?.message)
        }
    })
    const onSubmit= data=>{
        console.log(data);
        // user login
        userLogin(data?.email, data?.password)
        .then((result)=>{
            console.log(result?.user)
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'You have successfully logged in.',
                timer: 1500
            });
            userLoginMutation(data?.email)
            navigate('/')
        }).catch((error)=>{
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Logged in failed!',
                text: `${error?.message}`,
                showConfirmButton: true
            })
        })
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
                                <div><Link className="link link-hover">Forgot password?</Link></div>
                                <button className="btn btn-neutral mt-4">Login</button>
                            </fieldset>
                        </form>
                        <p>Don't have an account? Please <Link to='/auth/register' className='text-blue-600 underline'>Register </Link> </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;