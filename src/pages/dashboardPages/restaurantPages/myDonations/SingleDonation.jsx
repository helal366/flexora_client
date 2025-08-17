import { useMutation } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import queryClient from '../../../../api/queryClient';
import useAuth from '../../../../hooks/useAuth';
import { Link } from 'react-router';

const SingleDonation = ({donation}) => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()
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

    return (
       <div
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
          <div className='text-[15px] mb-3'>
            <p><strong className='text-teal-700 italic'>Food Type :</strong> <span className='text-teal-800'>{donation.food_type}</span> </p>
            <p>
              <strong className="text-teal-700 italic">Quantity :</strong>{' '}
              <span className="text-teal-800">
                {donation.quantity} {donation.unit}
              </span>
            </p>

            <p>
              <strong className="text-teal-700 italic">Restaurant :</strong>{' '}
              <span className="text-teal-800">{donation.restaurant_name}</span>
            </p>

            <p>
              <strong className="text-teal-700 italic">Status :</strong>{' '}
              <span
                className={`font-semibold ${donation.status === 'Verified'
                  ? 'text-green-600'
                  : donation.status === 'Rejected'
                    ? 'text-red-600'
                    : 'text-yellow-700'
                  }`}
              >
                {donation.status}
              </span>
            </p>
          </div>


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
    );
};

export default SingleDonation;