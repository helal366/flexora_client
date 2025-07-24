import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/loadingComponents/Loading';
import CardCharityRequest from './CardCharityRequest';

const HomeCharityRequests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: requests, isLoading } = useQuery({
        queryKey: ['requests'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requests/home_page?email=${user?.email}`);
            return res?.data;
        }
    });
    console.log({ requests })

    if (isLoading) {
        return <Loading />
    }
    return (
        <section className="my-10 px-4 md:px-10 py-10 bg-teal-50 rounded border border-gray-500/50 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-teal-700"> Charity Requests</h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {
                    requests.map((request) => (
                       <CardCharityRequest 
                       key={request?._id}
                       request={request} 
                       />
                    ))
                }
            </div>

        </section>
    );
};

export default HomeCharityRequests;