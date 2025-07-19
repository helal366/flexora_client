import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';

const MyRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch all requests made by this charity
  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ['charityRequests', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests/charity?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Cancel request mutation
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
      <h2 className="text-2xl font-semibold mb-4">My Donation Requests</h2>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Donation Title</th>
                <th>Image</th>
                <th>Restaurant</th>
                <th>Food Type</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Pickup</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id}>
                  <td>{req.donation_title}</td>
                  <td>
                    <img src={req.donation_image} alt="donation" className="w-12 h-12 object-cover rounded" />
                  </td>
                  <td>{req.restaurant_name}</td>
                  <td>{req.food_type || 'N/A'}</td>
                  <td>{req.quantity || 'N/A'}</td>
                  <td className="max-w-xs truncate">{req.request_description}</td>
                  <td>
                    {req.preffered_pickup_time} <br />
                    {req.preffered_pickup_date}
                  </td>
                  <td><span
                      className={`px-2 py-1 rounded text-sm ${
                        req.request_status === 'Accepted'
                          ? 'bg-green-200 text-green-800'
                          : req.request_status === 'Rejected'
                          ? 'bg-red-200 text-red-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }`}
                    >
                      {req.request_status}
                    </span></td>
                  <td>
                    {req.request_status === 'Pending' && (
                      <button
                        onClick={() => handleCancel(req._id)}
                        className="btn btn-error btn-sm"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyRequests;

