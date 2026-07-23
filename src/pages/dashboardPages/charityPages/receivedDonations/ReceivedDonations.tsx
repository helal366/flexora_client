import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import Loading from '../../../../components/loadingComponents/Loading';
import AddReviewModalReceivedDonations from './AddReviewModalReceivedDonations';
import NoReceivedDonations from './NoReceivedDonations';

const ReceivedDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['received-donations', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/requests?charity_representative_email=${user?.email}&picking_status=Picked Up`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });
  if(requests?.length===0) return <NoReceivedDonations/>
  if (isLoading) return <Loading />;

  return (
    <div className="grid gap-4 md:grid-cols-2 my-10 ml-4">
      {requests.map((request) => (
        <div key={request._id} className="card bg-gray-200 shadow-md p-4 rounded-md">
          <img
            src={request.donation_image}
            className="w-full h-48 object-cover rounded mb-3 shadow-xl shadow-white"
            alt="donation"
          />
          <h2 className="text-xl font-semibold my-4">{request.donation_title}</h2>
          <p>
            <span className="text-teal-700 italic font-semibold">Restaurant :</span>{' '}
            <span className="text-teal-800">{request.restaurant_name}</span>
          </p>
          <p>
            <span className="text-teal-700 italic font-semibold">Food Type :</span>{' '}
            <span className="text-teal-800">{request.food_type}</span>
          </p>
          <p>
            <span className="text-teal-700 italic font-semibold">Quantity :</span>{' '}
            <span className="text-teal-800">
              {request.quantity} {request.unit}
            </span>
          </p>
          <p>
            <span className="text-teal-700 italic font-semibold">Donation Status :</span>{' '}
            <span className="text-teal-800">
              {request.donation_status} 
            </span>
          </p>
          <p>
            <span className="text-teal-700 italic font-semibold">Pickup Date :</span>{' '}
            <span className="text-teal-800">{request.preferred_pickup_date}</span>
          </p>

          <button
            className="btn mt-5 hover:bg-teal-300"
            onClick={() => {
              setSelectedRequest(request);
              setIsModalOpen(true);
            }}
          >
            Add Review
          </button>
        </div>
      ))}

      {selectedRequest && (
        <AddReviewModalReceivedDonations
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRequest(null);
          }}
          request={selectedRequest}
          userName={user.displayName}
          userEmail={user.email}
        />
      )}
    </div>
  );
};

export default ReceivedDonations;
