import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';

const MyRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ['charityRequests', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests/charity?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { mutate: cancelRequest } = useMutation({
    mutationFn: async (requestId) => {
      const res = await axiosSecure.delete(`/requests/${requestId}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Cancelled!', 'Your request has been cancelled.', 'success');
      refetch();
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to cancel request.', 'error');
    },
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to cancel this request.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        cancelRequest(id);
      }
    });
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">My Donation Requests</h2>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div key={req._id} className="card bg-base-100 shadow-lg rounded-lg">
              <figure className="h-48">
                <img
                  src={req.donation_image}
                  alt={req.donation_title}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </figure>
              <div className="card-body space-y-2">
                <h2 className="card-title">{req.donation_title}</h2>
                <p><span className="font-semibold">Restaurant:</span> {req.restaurant_name}</p>
                <p><span className="font-semibold">Food Type:</span> {req.food_type || 'N/A'}</p>
                <p><span className="font-semibold">Quantity:</span> {req.quantity} {req?.unit}s</p>
                <p className="line-clamp-2">
                  <span className="font-semibold">Description:</span> {req.request_description}
                </p>
                <p>
                  <span className="font-semibold">Preferred Pickup:</span>{' '}
                  {req.preferred_pickup_time} on {req.preferred_pickup_date}
                </p>
                <div>
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium inline-block ${
                      req.request_status === 'Accepted'
                        ? 'bg-green-200 text-green-800'
                        : req.request_status === 'Rejected'
                        ? 'bg-red-200 text-red-800'
                        : 'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    {req.request_status}
                  </span>
                </div>
                {req.request_status === 'Pending' && (
                  <button
                    onClick={() => handleCancel(req._id)}
                    className="btn btn-error btn-sm mt-2"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;
