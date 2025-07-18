import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllDonations = () => {
    const axiosSecure = useAxiosSecure();

    const { data: donations = [], isLoading } = useQuery({
        queryKey: ['all-donations'],
        queryFn: async () => {
            const res = await axiosSecure.get('/donations');
            return res.data.filter(d => d.status === 'Verified' );
        }
    });

    if (isLoading) return <p>Loading donations...</p>;

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-6 py-6">
            {donations.map(donation => (
                <div key={donation._id} className="border rounded-xl shadow-md p-4 bg-[#fffaf0]">
                    <img src={donation.image} alt={donation.donation_title} className="h-48 w-full object-cover rounded-md mb-3" />
                    <h2 className="text-xl font-semibold mb-4 text-teal-900">{donation.donation_title}</h2>
                    <p className="text-sm text-gray-600">
                        <span className='text-[15px] text-teal-800 italic font-medium'>
                            Restaurant:
                        </span> {donation.restaurant_name}
                    </p>
                    <p className="text-sm text-gray-600">
                        <span className='text-[15px] text-teal-800 italic font-medium'>Location: </span>  {donation.location}
                    </p>
                    <p className="text-sm text-gray-600">
                        <span className='text-[15px] text-teal-800 italic font-medium'>Charity: </span> {donation.charity_name || 'Not assigned'}</p>
                    <p className="text-sm text-gray-600">
                        <span className='text-[15px] text-teal-800 italic font-medium'>Donation Status: </span> {donation.donation_status}</p>
                    <p className="text-sm text-gray-600"><span className='text-[15px] text-teal-800 italic font-medium'>Quantity: </span> {donation.quantity} {donation.unit}</p>
                    <Link to={`/donations/${donation._id}`} className="btn btn-sm mt-3 bg-teal-700 hover:bg-teal-900 text-white">
                        Details
                    </Link>
                </div>
            ))}
        </section>
    );
};

export default AllDonations;