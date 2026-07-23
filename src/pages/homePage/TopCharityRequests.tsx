import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/loadingComponents/Loading';

const TopCharityRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { data, isLoading } = useQuery({
        queryKey: ['charity', 'requests'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/top-charity-requests`);
            return res?.data
        }
    })
    if (isLoading) {
        return <Loading />
    }
    if (!data) return <p>No top charity data found.</p>;
    const { charity, requests } = data;
    return (
        <section className="my-10 px-4 md:px-10 py-10 bg-teal-50 rounded border border-gray-500/50 shadow-lg">
            <h2 className="text-3xl font-bold mb-10 text-center text-teal-700"> The Charity who made maximum requests</h2>
            <section className='mb-10'>
                <h3 className="text-xl font-semibold mb-4 text-center text-teal-700"> {charity?.organization_name}</h3>
                <div className='flex justify-center'>
                    <img className='border border-gray-400/50 rounded-lg shadow-xl max-w-11/12' src={charity?.organization_logo} alt="" />
                </div>
            </section>

            <section>
                <h3 className="text-xl font-semibold mb-6 text-center text-teal-700"> The requests made by {charity?.organization_name}</h3>
                <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
                {
                    requests.map(req => <div key={req?._id} className="card bg-gray-200  shadow-2xl border border-gray-400/50">
                        <figure>
                            <img className='w-full h-[150px] border border-white shadow-2xl'
                                src={req?.donation_image}
                                alt={req?.donation_title} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title two">{req?.donation_title}</h2>
                            <p>
                                <span className='text-md font-semibold two'>Donated Restaurant: </span> 
                                <span className='text-black'>{req?.restaurant_name}</span>
                            </p>
                            
                        </div>
                    </div>)
                }
                </div>
            </section>

        </section>
    );
};

export default TopCharityRequests;