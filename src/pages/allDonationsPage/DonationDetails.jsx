import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import useUserRole from './../../hooks/useUserRole';
import RequestDonationModal from '../../components/RequestDonationModal';
import AddReviewModal from '../../components/AddReviewModal';
import Loading from '../../components/loadingComponents/Loading';
import queryClient from '../../api/queryClient';

const DonationDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { userInfo, isUser, isCharity } = useUserRole();
  const axiosSecure = useAxiosSecure();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const { data: donation, isLoading: donationLoading } = useQuery({
    queryKey: ['donation', id, user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}?email=${user?.email}`);
      return res.data;
    },
    enabled: !!id && !!user?.email,
  });

  const { data: alreadyRequested = false, isLoading: requestCheckLoading } = useQuery({
    queryKey: ['request-check', donation?._id, user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get('/requests/check', {
        params: {
          donation_id: donation?._id,
          charity_email: user?.email,
        },
      });
      return res?.data?.alreadyRequested;
    },
    enabled: !!donation?._id && !!user?.email && isCharity,
  });

  const {
    register: requestRegister,
    handleSubmit: handleRequestSubmit,
    reset: resetRequestForm,
  } = useForm();

  const { mutate: submitRequest } = useMutation({
    mutationFn: async (data) => {
      const requestData = {
        donation_id: id,
        donation_title: donation?.donation_title,
        donation_image: donation?.image,
        food_type: donation?.food_type,
        quantity: donation?.quantity,
        unit: donation?.unit,
        restaurant_name: donation?.restaurant_name,
        restaurant_email: donation?.restaurant_email,
        restaurant_representative_name: donation?.restaurant_representative_name,
        restaurant_representative_email: donation?.restaurant_representative_email,
        charity_representative_name: user?.displayName,
        charity_representative_email: user?.email,
        charity_name: userInfo?.user_by_email?.organization_name,
        charity_email: userInfo?.user_by_email?.organization_email,
        request_description: data?.request_description,
        preferred_pickup_time: data?.pickup_time,
        preferred_pickup_date: formattedDate,
        request_status: 'Pending',
      };

      await axiosSecure.post('/donation-requests', requestData);
      await axiosSecure.patch(`/donations/${id}`, {
        status: 'Verified',
        donation_status: 'Requested',
      });
    },
    onSuccess: () => {
      Swal.fire('Requested!', 'Donation request submitted.', 'success');
      setShowRequestModal(false);
      setHasRequested(true);
      resetRequestForm();
    },
    onError: (error) => {
      if (
        error.response?.status === 400 &&
        error.response?.data?.message === 'You have already requested this donation.'
      ) {
        Swal.fire('Oops!', 'You have already sent a request for this donation.', 'warning');
      } else {
        Swal.fire('Error', 'Could not submit request', 'error');
      }
    },
  });

  const { mutate: submitReview } = useMutation({
    mutationFn: async (reviewData) => {
      const res = await axiosSecure.post('/reviews', reviewData);
      return res.data;
    },
    onSuccess: () => {
       Swal.fire('Successful!', 'Review submitted!', 'success');
      queryClient.invalidateQueries(['reviews', id]);
      setShowReviewModal(false);
    },
    onError: () => {
    Swal.fire('Error', 'Failed to submit review', 'error');
    },
  });

  const handleReviewSubmit = async (data) => {
  setReviewSubmitting(true);
  try {
    if (!donation) {
      Swal.fire('Error', 'Donation data is missing. Please try again.', 'error');
      return;
    }

    const reviewData = {
      donation_id: donation._id.toString(),
      donation_title: donation.donation_title,
      restaurant_name: donation.restaurant_name,
      restaurant_email: donation.restaurant_email,
      restaurant_representative_name: donation.restaurant_representative_name,
      restaurant_representative_email: donation.restaurant_representative_email,
      donation_image: donation.image,
      reviewer_name: data.reviewer_name,
      reviewer_email: user.email,
      description: data.description,
      rating: data.rating,
      created_at: new Date(),
    };

    await submitReview(reviewData);
  } finally {
    setReviewSubmitting(false);
  }
};



  if (donationLoading || requestCheckLoading) {
    return <Loading />;
  }

  return (
    <section className="p-4 my-10 mx-auto bg-teal-50 border border-gray-500/50 rounded">
      <section className="flex flex-col lg:flex-row gap-8 justify-items-center lg:items-center">
        <div>
          {donation.image && (
            <img
              src={donation.image}
              alt={donation.donation_title}
              className="w-full max-w-sm rounded-lg mb-4"
            />
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-teal-800 italic">{donation.donation_title}</h2>
          <p className="text-teal-800">{donation.description}</p>
          <p><strong className="text-teal-800 italic">Restaurant : </strong>{donation.restaurant_name}</p>
          <p><strong className="text-teal-800 italic">Restaurant Location : </strong>{donation.location}</p>
          <p><strong className="text-teal-800 italic">Quantity : </strong>{donation.quantity}</p>
          <p><strong className="text-teal-800 italic">Status : </strong>{donation.status}</p>

          {donation.request && (
            <div className="mt-4 border-t pt-4">
              <p><strong className="text-teal-800 italic">Requested by : </strong>{donation.request.charity_name}</p>
              <p><strong className="text-teal-800 italic">Description : </strong>{donation.request.request_description}</p>
              <p><strong className="text-teal-800 italic">Pick up Time : </strong>{donation.request.pickup_time}</p>
              <p><strong className="text-teal-800 italic">Pick up Date : </strong>{formattedDate}</p>
              <p><strong className="text-teal-800 italic">Request Status : </strong>{donation.request.request_status}</p>
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            {(isUser || isCharity) && (
              <button
                onClick={() => setShowReviewModal(true)}
                className="btn btn-outline bg-teal-600 hover:bg-teal-900 text-gray-100 shadow-xl"
              >
                Add Review
              </button>
            )}

            {isCharity && (
              <>
                {donation?.is_locked || alreadyRequested || hasRequested ? (
                  <button className="btn btn-disabled bg-gray-300 text-gray-600 shadow-inner" disabled>
                    {donation?.is_locked ? 'Not Available' : 'Request Sent'}
                  </button>
                ) : (
                  <button
                    onClick={() => setShowRequestModal(true)}
                    className="btn btn-outline bg-teal-600 hover:bg-teal-900 text-gray-100 shadow-xl"
                  >
                    Request Donation
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {showRequestModal && (
        <RequestDonationModal
          donation={donation}
          user={user}
          requestRegister={requestRegister}
          handleRequestSubmit={handleRequestSubmit}
          submitRequest={submitRequest}
          setShowRequestModal={setShowRequestModal}
        />
      )}

      {showReviewModal && (
        <AddReviewModal
          isOpen={showReviewModal}
          closeModal={() => setShowReviewModal(false)}
          onSubmitReview={handleReviewSubmit}
          loading={reviewSubmitting}
          defaultReviewerName={user?.displayName || ''}
        />
      )}
    </section>
  );
};

export default DonationDetails;
