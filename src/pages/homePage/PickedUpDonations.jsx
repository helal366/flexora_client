import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/loadingComponents/Loading';

const PickedUpDonations = () => {
    const axiosSecure=useAxiosSecure()
    const {data:pickedups=[], isLoading}=useQuery({
        queryKey: ['pickedupDonations'],
        queryFn: async()=>{
            const res=await axiosSecure.get(`/donations/picked-up`);
            return res?.data;
        }
    });
    if(isLoading){
        return <Loading/>
    }
    console.log({pickedups})
    return (
        <section className="my-10 px-4 md:px-10 py-10 bg-teal-50 rounded border border-gray-500/50 shadow-lg">
            <h2 className="text-3xl font-bold mb-10 text-center text-teal-700"> All the Picked Up donations are here</h2>  
                <section className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
                {
                    pickedups.map(req => <div key={req?._id} className="card bg-gray-200  shadow-2xl border border-gray-400/50">
                        <figure>
                            <img className='w-full h-[150px] border border-white shadow-2xl'
                                src={req?.donation_image}
                                alt={req?.donation_title} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{req?.donation_title}</h2>
                            <p><span className='text-md font-semibold'>Donated Restaurant:</span> {req?.restaurant_name}</p>
                            
                        </div>
                    </div>)
                }
                </section>
        </section>
    );
};

export default PickedUpDonations;