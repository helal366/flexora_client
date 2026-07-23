import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/loadingComponents/Loading';
import useAuth from '../../hooks/useAuth';
import { AxiosError } from 'axios';

// 1. Define the interface for a Charity object
interface Charity {
    _id: string;
    organization_logo: string;
    organization_name: string;
    mission: string;
    name: string;
}

// 2. Define the interface for custom backend error payloads
interface BackendErrorPayload {
    message?: string;
}
const Charities: React.FC  = () => {
    const { user } = useAuth();
    const userEmail = user?.email
    const axiosSecure = useAxiosSecure();

     // 3. Add explicit types to useQuery <Data, Error>
    const { data: charities = [], isLoading, isError, error } = useQuery<Charity[], AxiosError<BackendErrorPayload>>({
        queryKey: ['charities', userEmail],
        queryFn: async () => {
            if (!userEmail) return []; // Guard clause in case email isn't loaded yet
            const res = await axiosSecure.get(`/charities?email=${userEmail}`);
            return res?.data
        },
        enabled: !!userEmail, // Only run the query when the user email is available
    })
    if (isLoading) {
        return <Loading />
    }
    if (isError) {
         // 4. Safely extract message from typed AxiosError
        const backendMessage = error?.response?.data?.message || error.message;
        return (
            <div className="text-red-600 bg-red-100 border border-red-400 p-4 rounded">
                {backendMessage}
            </div>
        );
    }
    console.log({charities})
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
                        <p><span className='text-md font-semibold'>Charity representative: </span>{c?.name}</p>
                    </div>
                </div>
                )}
            </section>
        </section>
    );
};

export default Charities;