import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/loadingComponents/Loading';
import useAuth from './../../hooks/useAuth';

const Charities = () => {
    const {user}=useAuth();
    const userEmail=user?.email
    const axiosSecure=useAxiosSecure()
    const {data: charities=[], isLoading, isError, error}=useQuery({
        queryKey: ['charities'],
        queryFn: async()=>{
            const res=await axiosSecure.get(`/charities?email=${userEmail}`);
            return res?.data
        }
    })
    if(isLoading){
        return <Loading/>
    }
    if(isError){
        // error comes from Axios response or query failure
    const backendMessage = error?.response?.data?.message || error.message;
    return (
      <div className="text-red-600 bg-red-100 border border-red-400 p-4 rounded">
        {backendMessage}
      </div>
    );
    }
    return (
        <section>
            All the Charities list here: {charities.length}
        </section>
    );
};

export default Charities;