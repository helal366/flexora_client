import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/loadingComponents/Loading';

const PickedUpDonations = () => {
    const axiosSecure=useAxiosSecure()
    const {data, isLoading}=useQuery({
        queryKey: ['pickedupDonations'],
        queryFn: async()=>{
            const res=await axiosSecure.get(`/donations/picked-up`);
            return res?.data;
        }
    });
    if(isLoading){
        return <Loading/>
    }
    console.log({data})
    return (
        <section>
            
        </section>
    );
};

export default PickedUpDonations;