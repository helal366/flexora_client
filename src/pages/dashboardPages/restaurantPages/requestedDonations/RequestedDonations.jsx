import React from 'react';
// import  { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import queryClient from '../../../../api/queryClient';

const RequestedDonations = () => {
  const axiosSecure = useAxiosSecure();
//   const [selectedRequest, setSelectedRequest] = useState(null);

  const { data: requests = [], isPending } = useQuery({
    queryKey: ['restaurant-requests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/requests/restaurant'); // Adjust route
      return res.data;
    },
  });

  const { mutate: updateStatus } = useMutation({
    mutationFn: async ({ requestId, newStatus, donationId }) => {
      const res = await axiosSecure.patch(`/requests/status/${requestId}`, { status: newStatus });
      if (newStatus === 'Accepted') {
        await axiosSecure.patch(`/requests/reject-others/${donationId}`, { except: requestId });
      }
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Success', 'Status updated successfully.', 'success');
      queryClient.invalidateQueries(['restaurant-requests']);
    },
    onError: () => {
      Swal.fire('Error', 'Something went wrong.', 'error');
    },
  });

  const handleAccept = (req) => {
    console.log(req)
    updateStatus({ requestId: req._id, newStatus: 'Accepted', donationId: req.donation_id });
};

const handleReject = (req) => {
      console.log(req)
    updateStatus({ requestId: req._id, newStatus: 'Rejected', donationId: req.donation_id });
  };

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Requested Donations</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Food Type</th>
            <th>Charity</th>
            <th>Email</th>
            <th className="w-[250px] break-words" >Description</th>
            <th>Pickup Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td>{req.donation_title}</td>
              <td>{req.food_type || 'N/A'}</td>
              <td>{req.charity_name}</td>
              <td>{req.charity_email}</td>
              <td className="w-[250px] break-words">{req.request_description}</td>
              <td>{req.preffered_pickup_time} on {req.preffered_pickup_date}</td>
              <td>{req.request_status}</td>
              <td className="flex gap-2">
                {req.request_status === 'Pending' && (
                  <>
                    <button onClick={() => handleAccept(req)} className="btn btn-success btn-sm">Accept</button>
                    <button onClick={() => handleReject(req)} className="btn btn-error btn-sm">Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestedDonations;
