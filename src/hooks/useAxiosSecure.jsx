import React from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import app from '../firebase/firebase.config';

const auth=getAuth(app)
const axiosSecure=axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true
})
const useAxiosSecure = () => {
    // interceptors request
    axiosSecure.interceptors.request.use(async(config)=>{
        const user=auth?.currentUser;
        if(user){
            const token=await user?.getIdToken();
            config.headers.Authorization= `Bearer ${token}`
        }
        return config
    }, (error)=>{
        return Promise.reject(error)
    })
    // interceptors response
    //.....................todo response
    return axiosSecure;
};

export default useAxiosSecure;