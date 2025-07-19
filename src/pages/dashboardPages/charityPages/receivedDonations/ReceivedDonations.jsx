import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import Loading from '../../../../components/loadingComponents/Loading';
import AddReviewModal from './AddReviewModal';

const ReceivedDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedDonation, setSelectedDonation] = useState(null);

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ['received-donations', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests?charity_email=${user?.email}&donation_status=Picked Up`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p><Loading/> </p>;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {donations.map(donation => (
        <div key={donation._id} className="card bg-lime-100 shadow-md p-4 rounded-xl">
          <img src={donation.donation_image} className="w-full h-48 object-cover rounded mb-3" alt="donation" />
          <h2 className="text-xl font-semibold">{donation.donation_title}</h2>
          <p><strong>Restaurant:</strong> {donation.restaurant_name}</p>
          <p><strong>Food Type:</strong> {donation.food_type}</p>
          <p><strong>Quantity:</strong> {donation.quantity} {donation.unit}</p>
          <p><strong>Pickup Date:</strong> {donation.preferred_pickup_date}</p>
          <button
            onClick={() => setSelectedDonation(donation)}
            className="btn bg-blue-500 text-white mt-3 hover:bg-blue-600"
          >
            Review
          </button>
        </div>
      ))}
      {selectedDonation && (
        <AddReviewModal donation={selectedDonation} closeModal={() => setSelectedDonation(null)} />
      )}
    </div>
  );
};

export default ReceivedDonations;
