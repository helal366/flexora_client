import React from 'react';
// import useAuth from '../../hooks/useAuth';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/loadingComponents/Loading';

const CardCharityRequest = ({ request }) => {
    // const {user}=useAuth();
    // const axiosSecure=useAxiosSecure()
    // const charity_email=request?.charity_email;
    // const userEmail=user?.email;
    // const {data: charity, isLoading}=useQuery({
    //     queryKey: ['charity', charity_email],
    //     queryFn: async()=>{
    //         const res=await axiosSecure.get(`user/charity_requests/${charity_email}?email=${userEmail}`);
    //         return res?.data;
    //     },
    //     enabled: !!charity_email && !!userEmail
    // });
    // if(isLoading){
    //     return <Loading/>
    // }
    return (
        <section className='card bg-gray-200 shadow-xl'>
            <figure>
                <img
                    className='max-h-40 w-full'
                    src={request?.charity_logo}
                    alt={request?.charity_name} />
            </figure>
            <div className='card-body'>
                <h2 className="card-title mb-6"> {request?.charity_name} </h2>
                
                    <img
                        src={request?.donation_image}
                        alt={request?.donation_title || "Donated food"}
                        className="w-14 h-14 object-cover border-2 border-gray-400 rounded-md"
                    />
                <p> <span className='two'>Food Donation Title :</span> {request?.donation_title}</p>
                <p> <span className='two'>Charity Representative :</span> {request?.charity_representative_name}</p>
            </div>
        </section>
    );
};

export default CardCharityRequest;