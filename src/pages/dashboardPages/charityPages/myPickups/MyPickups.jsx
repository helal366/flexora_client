import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import queryClient from '../../../../api/queryClient';
import Loading from '../../../../components/loadingComponents/Loading';

const MyPickups = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['my-pickups', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests?charity_email=${user?.email}&request_status=Accepted`);
      return res?.data;
    },
    enabled: !!user?.email,
  });

  const mutation = useMutation({
    mutationFn: async (donation_id) => {
      return axiosSecure.patch(`/donations/${donation_id}`, {
        donation_status: 'Picked Up',
        updated_at: new Date(),
      });
    },
    onSuccess: () => {
      Swal.fire('Success!', 'Pickup confirmed.', 'success');
      queryClient.invalidateQueries(['my-pickups', user?.email]);
      queryClient.invalidateQueries(['received-donations', user?.email]);
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to confirm pickup.', 'error');
    }
  });

  const handleConfirmPickup = (donation_id) => {
    Swal.fire({
      title: 'Confirm Pickup?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, confirm',
    }).then(result => {
      if (result.isConfirmed) {
        mutation.mutate(donation_id);
      }
    });
  };

  if (isLoading) return <p><Loading/> </p>;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {requests.map(request => (
        <div key={request._id} className="card bg-teal-100 shadow-md p-4 rounded-xl">
          <img src={request.donation_image} className="w-full h-48 object-cover rounded mb-3" alt="donation" />
          <h2 className="text-xl font-semibold">{request.donation_title}</h2>
          <p><strong>Restaurant:</strong> {request.restaurant_name}, {request.location}</p>
          <p><strong>Food Type:</strong> {request.food_type}</p>
          <p><strong>Quantity:</strong> {request.quantity} {request.unit}</p>
          <p><strong>Pickup Time:</strong> {request.preferred_pickup_time}</p>
          <p><strong>Status:</strong> Assigned</p>
          <button
            onClick={() => handleConfirmPickup(request.donation_id)}
            className="btn bg-green-500 text-white mt-3 hover:bg-green-600"
          >
            Confirm Pickup
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyPickups;
