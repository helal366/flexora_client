import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import { useState } from 'react';
import NoVerifiedDonations from './NoVerifiedDonations';

const FeatureDonations = () => {
  const axiosSecure = useAxiosSecure();
  const {user}=useAuth();
  const [featuredIds, setFeaturedIds] = useState([]);

  // Fetch verified donations
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ['verifiedDonations'],
    queryFn: async () => {
      const res = await axiosSecure.get('/donations?status=Verified');
      return res.data;
    },
  });

  // Mutation to mark donation as featured
  const featureMutation = useMutation({
    mutationFn: async (donationId) => {
      const res = await axiosSecure.patch(`/donations/feature/${donationId}?email=${user?.email}`);
      return res?.data;
    },
    onSuccess: (_, id) => {
         setFeaturedIds((prev) => [...prev, id]);
      Swal.fire('Success!', 'Donation has been featured!', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Failed to feature donation', 'error');
    },
  });

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Verified Donations</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-teal-100 text-teal-800">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Food Type</th>
              <th>Restaurant</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id}>
                <td>
                  <img src={donation.image} alt="Food" className="w-20 h-14 object-cover rounded" />
                </td>
                <td>{donation.donation_title}</td>
                <td>{donation.food_type}</td>
                <td>{donation.restaurant_name}</td>
                <td>
                  <button
                    onClick={() => featureMutation.mutate(donation._id)}
                    className="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white"
                     disabled={featuredIds.includes(donation._id)}
                  >
                     {featuredIds.includes(donation._id) ? 'Featured' : 'Feature'}
                  </button>
                </td>
              </tr>
            ))}
            {donations.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  <NoVerifiedDonations/>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeatureDonations;
