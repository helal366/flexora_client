import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import queryClient from '../../../../api/queryClient';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const MyDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch donations for this restaurant user by email
  const { data: donations = [], isLoading, isError } = useQuery({
    queryKey: ['my-donations', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations?restaurant_email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Mutation to delete donation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/donations/${id}`);
    },
    onSuccess: () => {
      Swal.fire('Deleted!', 'Donation has been deleted.', 'success');
      queryClient.invalidateQueries(['my-donations', user?.email]);
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to delete donation.', 'error');
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This donation will be deleted permanently.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p>Loading your donations...</p>;
  if (isError) return <p>Error loading donations.</p>;
  if (donations.length === 0) return <p>No donations found.</p>;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {donations.map(donation => (
        <div
          key={donation._id}
          className="border rounded shadow p-4 bg-teal-50 flex flex-col"
        >
          <img
            src={donation.image}
            alt={donation.donation_title}
            className="w-full h-48 object-cover rounded mb-3"
          />
          <h3 className="font-semibold text-xl text-teal-900 italic mb-4">
            {donation.donation_title}
          </h3>
          <p><strong className='text-teal-700 italic'>Food Type :</strong> {donation.food_type}</p>
          <p><strong className='text-teal-700 italic'>Quantity :</strong> {donation.quantity} {donation.unit}</p>
          <p><strong className='text-teal-700 italic'>Restaurant :</strong> {donation.restaurant_name}</p>
          <p>
            <strong className='text-teal-700 italic'>Status:</strong>{' '}
            <span
              className={`font-semibold ${
                donation.status === 'Verified'
                  ? 'text-green-600'
                  : donation.status === 'Rejected'
                  ? 'text-red-600'
                  : 'text-yellow-700'
              }`}
            >
              {donation.status}
            </span>
          </p>

          <div className="mt-auto flex gap-3 pt-4">
            {/* Show Update only if not rejected */}
            {donation.status !== 'Rejected' && (
              <Link
                to={`/dashboard/update_my_donation/${donation._id}`}
                className="btn btn-sm bg-teal-200 hover:bg-teal-400 text-gray-900 flex-1 text-center"
              >
                Update
              </Link>
            )}
            <button
              onClick={() => handleDelete(donation._id)}
              className="btn btn-sm bg-teal-200 hover:bg-teal-400 text-red-700 flex-1"
              disabled={deleteMutation.isLoading}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default MyDonations;
