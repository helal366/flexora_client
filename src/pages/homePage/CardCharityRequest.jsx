import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/loadingComponents/Loading';

const CardCharityRequest = ({ request }) => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure()
    const charity_email=request?.charity_email;
    const userEmail=user?.email;
    const {data: charity, isLoading}=useQuery({
        queryKey: ['charity', charity_email],
        queryFn: async()=>{
            const res=await axiosSecure.get(`user/charity_requests/${charity_email}?email=${userEmail}`);
            return res?.data;
        },
        enabled: !!charity_email && !!userEmail
    });
    // console.log({charity})
    if(isLoading){
        return <Loading/>
    }
    return (
        <section  className='card bg-gray-200 shadow-xl'>
            <figure>
                <img
                    className='max-h-40 w-full'
                    src={request?.charity_logo}
                    alt={request?.charity_name} />
            </figure>
            <div className='card-body'>
                <h2 className="card-title"> {request?.charity_name} </h2>
                <p> <span className='two'>Mission :</span> {charity?.mission}</p>
                <p> <span className='two'>Food Donation Title :</span> {request?.donation_title}</p>
            </div>
        </section>
    );
};

export default CardCharityRequest;