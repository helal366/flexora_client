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
         if (!user?.email) return [];
      const res = await axiosSecure.get(`/requests/charity?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
    onError: () => {
      Swal.fire('Error!', 'Failed to fetch requests.', 'error');
    },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div key={req._id} className="card bg-base-100 shadow-md">
              <figure className="h-48 overflow-hidden">
                <img src={req.donation_image} alt={req.donation_title} className="w-full object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{req.donation_title}</h2>
                <p><strong>Restaurant:</strong> {req.restaurant_name}</p>
                <p><strong>Food Type:</strong> {req.food_type || 'N/A'}</p>
                <p><strong>Quantity:</strong> {req.quantity || 'N/A'}</p>
                <p><strong>Description:</strong> {req.request_description}</p>
                <p><strong>Pickup:</strong> {req.preferred_pickup_time} on {req.preferred_pickup_date}</p>
                <div className="mt-2">
                  <span
                    className={`inline-block px-2 py-1 text-sm rounded font-medium ${
                      req.request_status === 'Accepted'
                        ? 'bg-green-100 text-green-800'
                        : req.request_status === 'Rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {req.request_status}
                  </span>
                </div>
                {req.request_status === 'Pending' && (
                  <div className="card-actions justify-end mt-4">
                    <button
                      onClick={() => handleCancel(req._id)}
                      className="btn btn-error btn-sm"
                    >
                      Cancel
                    </button>
                  </div>
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
