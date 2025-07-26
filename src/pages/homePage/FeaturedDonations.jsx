import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import NoFeaturedDonations from './NoFeaturedDonations';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/loadingComponents/Loading';

const FeaturedDonations = () => {
  const axiosSecure = useAxiosSecure();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ['featuredDonations'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/featured`);
      return res?.data;
    }
  });

  if (isLoading) {
    return <Loading/>;
  }

  if (donations.length === 0) {
    return (
      <div className="text-center py-10 text-lg font-semibold text-red-500">
       <NoFeaturedDonations/>
      </div>
    );
  }

  return (
    <section className="my-10 px-4 md:px-10 py-10 bg-teal-50 rounded border border-gray-500/50 shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-teal-700"> Featured Donations</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {donations.slice(0, 8).map((donation) => (
          <div key={donation._id} className="bg-white shadow-md rounded-2xl overflow-hidden border border-teal-100">
            <img
              src={donation.image}
              alt={donation.donation_title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold text-teal-800">{donation.donation_title}</h3>
              <p className="text-sm text-gray-600">
                <span className='font-semibold text-teal-800 italic'>Type :</span> {donation.food_type}
              </p>
              <p className="text-sm text-gray-600">
                <span className='font-semibold text-teal-800 italic'>Restaurant :</span> {donation.restaurant_name}
              </p>
              <p className="text-sm text-gray-600">
                <span className='font-semibold text-teal-800 italic'>Location :</span> {donation.location}
              </p>
              <p className="text-sm font-semibold text-green-700">
                Status : {donation.donation_status || 'Available'}
              </p>
              <Link
                to={`/donations/${donation._id}`}
                className="inline-block bg-teal-600 text-white px-4 py-2 rounded-md mt-2 hover:bg-teal-800 text-sm"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedDonations;
