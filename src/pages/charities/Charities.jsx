import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/loadingComponents/Loading';
import useAuth from './../../hooks/useAuth';

const Charities = () => {
    const { user } = useAuth();
    const userEmail = user?.email
    const axiosSecure = useAxiosSecure()
    const { data: charities = [], isLoading, isError, error } = useQuery({
        queryKey: ['charities'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/charities?email=${userEmail}`);
            return res?.data
        }
    })
    if (isLoading) {
        return <Loading />
    }
    if (isError) {
        // error comes from Axios response or query failure
        const backendMessage = error?.response?.data?.message || error.message;
        return (
            <div className="text-red-600 bg-red-100 border border-red-400 p-4 rounded">
                {backendMessage}
            </div>
        );
    }
    return (
        <section className='py-10'>
            <h2 className='text-2xl my-5 font-semibold text-center'>All Charities list here: {charities.length}</h2>
            <section className='grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8'>

                {charities.map((c) => <div key={c?._id} className="card bg-base-100 shadow-xl">
                    <figure>
                        <img className='max-h-[150px] w-full'
                            src={c?.organization_logo}
                            alt={c?.organization_name} />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{c?.organization_name}</h2>
                        <p>{c?.mission}</p>
                        {/* <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                        </div> */}
                    </div>
                </div>
                )}
            </section>
        </section>
    );
};

export default Charities;