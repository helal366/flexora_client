import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/loadingComponents/Loading';

const TopDonatedRestaurant = () => {
    const axiosSecure=useAxiosSecure();
    const {data, isLoading}=useQuery({
        queryKey: ['topDonar'],
        queryFn: async()=>{
            const res=await axiosSecure.get(`/top-donated-restaurant`);
            return res?.data
        }
    });
    if(isLoading){
        return <Loading/>
    };
    const {restaurant, donations}=data;
    console.log({donations})
    return (
        <section className="my-10 px-4 md:px-10 py-10 bg-teal-50 rounded border border-gray-500/50 shadow-lg">
             <h2 className="text-3xl font-bold mb-6 text-center text-teal-700"> The Top Donated Restaurant</h2>
             <section className='mb-10'>
                <h3 className="text-xl font-semibold mb-4 text-center text-teal-700"> {restaurant?.organization_name}</h3>
                <div className='flex justify-center'>
                    <img className='border border-gray-400/50 rounded-lg shadow-xl max-w-11/12' src={restaurant?.organization_logo} alt="" />
                </div>
            </section>

            <section>
                <h3 className="text-xl font-semibold mb-6 text-center text-teal-700"> The donations made by {restaurant?.organization_name}</h3>
                <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
                {
                    donations.map(req => <div key={req?._id} className="card bg-gray-200  shadow-2xl border border-gray-400/50">
                        <figure>
                            <img className='w-full h-[150px] border border-white shadow-2xl'
                                src={req?.image}
                                alt={req?.donation_title} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{req?.donation_title}</h2>
                            <p><span className='text-md font-semibold'>Food Type:</span> {req?.food_type}</p>
                            
                        </div>
                    </div>)
                }
                </div>
            </section>
        </section>
    );
};

export default TopDonatedRestaurant;