import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaUtensils } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/loadingComponents/Loading';

const RecentVerifiedDonations = () => {
  const axiosSecure = useAxiosSecure();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ['recentVerifiedDonations'],
    queryFn: async () => {
      const res = await axiosSecure.get('/recent-verified-donations');
      return res?.data;
    },
  });

  if (isLoading) return <Loading />;

  console.log({donations})

  if (donations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center my-10">
        <FaUtensils className="text-6xl text-teal-500 mb-4 animate-bounce" />
        <p className="text-xl font-semibold text-teal-700">No recent verified donations found!</p>
      </div>
    );
  }

  return (
    <section className="my-10 px-4 md:px-10 py-10 bg-teal-50 rounded border border-gray-500/50 shadow-lg">
      <h2 className="text-3xl font-bold mb-10 text-center text-teal-700">
        Recent Verified Donations
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {donations.map(donation => (
          <div key={donation._id} className="card bg-gray-200 shadow-2xl border border-gray-400/50">
            <figure>
              <img
                className="w-full h-[150px] border border-white shadow-2xl object-cover"
                src={donation.image}
                alt={donation.donation_title}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title two">{donation.donation_title}</h2>
              <p>
                <span className="font-semibold two">Restaurant: </span> 
                <span className='text-black'>{donation.restaurant_name}</span>
              </p>
              <p>
                <span className="font-semibold two">Food Type: </span> 
                <span className='text-black'>{donation.food_type}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentVerifiedDonations;
