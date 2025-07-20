import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import useUserRole from './../../hooks/useUserRole';

const DonationDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { userInfo } = useUserRole();
  const axiosSecure = useAxiosSecure();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [hasRequested, setHasRequested] = useState(false)
  const { isUser, isCharity } = useUserRole();
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const { data: donation, isPending: donationLoading } = useQuery({
  queryKey: ['donation', id, user?.email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/donations/${id}?email=${user?.email}`);
    return res.data;
  },
  enabled: !!id && !!user?.email, // ensure both are ready
});


// Check if current charity already requested this donation
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

  const {
    register: reviewRegister,
    handleSubmit: handleReviewSubmit,
    reset: resetReviewForm,
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
      // 1️⃣ Store request in requests collection
      await axiosSecure.post('/donation-requests', requestData);

      // 2️⃣ Update donation status (OPTIONAL: only if it's not already "Requested")
      await axiosSecure.patch(`/donations/${id}`, {
        status: 'Verified',
        donation_status: 'Requested',
      });
    },
    onSuccess: () => {
      Swal.fire('Requested!', 'Donation request submitted.', 'success');
      setShowRequestModal(false);
      setHasRequested(true)
      resetRequestForm();
    },
    onError: (error) => {
      if (error.response?.status === 400 && error.response?.data?.message === 'You have already requested this donation.') {
        Swal.fire('Oops!', 'You have already sent a request for this donation.', 'warning');
      } else {
        Swal.fire('Error', 'Could not submit request', 'error');
      }
    },
  });

  const { mutate: submitReview } = useMutation({
    mutationFn: async (data) => {
      const reviewData = {
        donation_id: id,
        donation_title: donation?.donation_title,
        restaurant_name: donation?.restaurant_name,
        restaurant_email: donation?.restaurant_email,
        restaurant_representative_name: donation?.restaurant_representative_name,
        restaurant_representative_email:donation?.restaurant_representative_email,
        donation_image: donation?.image,
        reviewer_name: data?.reviewer_name,
        reviewer_email: data?.reviewer_email,
        description: data?.description,
        rating: parseInt(data.rating),
      };
      const res = await axiosSecure.post('/reviews', reviewData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Review Submitted!', '', 'success');
      setShowReviewModal(false);
      resetReviewForm();
    },
    onError: () => {
      Swal.fire('Error', 'Failed to submit review.', 'error');
    },
  });

   if (donationLoading || requestCheckLoading) {
    return <div className="text-center py-10">Loading donation details...</div>;
  };

  return (
    <section className="p-4 my-10 mx-auto bg-teal-50 border border-gray-500/50 rounded">
      <section className='flex flex-col lg:flex-row gap-8 justify-items-center lg:items-center'>
        {/* Donation Image */}
        <div>
          {donation.image && (
            <img
              src={donation.image}
              alt={donation.donation_title}
              className="w-full max-w-sm rounded-lg mb-4"
            />
          )}
        </div>
        {/* other texts */}
        <div className=''>
          <h2 className="text-2xl font-bold mb-4 text-teal-800 italic">{donation.donation_title}</h2>
          <p className="text-teal-800">{donation.description}</p>
          <p><strong className='text-teal-800 italic'>Restaurant : </strong>
            <span className='text-gray-800'>{donation.restaurant_name}</span>
          </p>
          <p><strong className='text-teal-800 italic'>Restaurant Location : </strong>
            <span className='text-gray-800'>{donation.location}</span>
          </p>
          <p><strong className='text-teal-800 italic'>Quantity : </strong>
            <span className='text-gray-800'>{donation.quantity}</span> </p>
          <p><strong className='text-teal-800 italic'>Status : </strong>
            <span className='text-gray-800'>{donation.status}</span></p>

          {donation.request && (
            <div className="mt-4 border-t pt-4">
              <p>
                <strong className="text-teal-800 italic">Requested by : </strong>
                <span className="text-gray-800">{donation.request.charity_name}</span>
              </p>
              <p>
                <strong className="text-teal-800 italic">Description : </strong>
                <span className="text-gray-800">{donation.request.request_description}</span>
              </p>
              <p>
                <strong className="text-teal-800 italic">Pick up Time : </strong>
                <span className="text-gray-800">{donation.request.pickup_time}</span>
              </p>
              <p>
                <strong className="text-teal-800 italic">Pick up Date : </strong>
                <span className="text-gray-800">{formattedDate}</span>
              </p>
              <p>
                <strong className="text-teal-800 italic">Request Status : </strong>
                <span className="text-gray-800">{donation.request.request_status}</span>
              </p>

            </div>
          )}

          {/* Buttons */}
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
                {donation?.is_locked ? (
                  <button
                    className="btn btn-disabled bg-gray-300 text-gray-600 shadow-inner"
                    disabled
                  >
                    Not Available
                  </button>
                ) : (alreadyRequested || hasRequested) ? (
                  <button
                    className="btn btn-disabled bg-gray-300 text-gray-600 shadow-inner"
                    disabled
                  >
                    Request Sent
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

      {/* Modals */}
      {showRequestModal && (
        <dialog className="modal modal-open ">
          <section className="modal-box">
            <h3 className="font-bold text-lg mb-2">Request Donation</h3>
            <form onSubmit={handleRequestSubmit(submitRequest)} className="space-y-3">
              {/* donation image */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Donation Image</span>
                </label>
                <img
                  src={donation?.image}
                  alt="Donation"
                  className="w-full max-h-64 object-cover rounded-lg border"
                />
              </div>
              {/* donation title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Donation Title</span>
                </label>
                <input
                  readOnly
                  defaultValue={donation?.donation_title}
                  className="input input-bordered w-full"
                />
              </div>

              {/* donation restaurant */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Restaurant Name</span>
                </label>
                <input
                  readOnly
                  defaultValue={donation?.restaurant_name}
                  className="input input-bordered w-full"
                />
              </div>

              {/* charity name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Charity Name</span>
                </label>
                <input
                  readOnly
                  {...requestRegister('charity_name')}
                  defaultValue={user?.displayName}
                  className="input input-bordered w-full"
                />
              </div>

              {/* charity email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Charity Email</span>
                </label>
                <input
                  readOnly
                  {...requestRegister('charity_email')}
                  defaultValue={user?.email}
                  className="input input-bordered w-full"
                />
              </div>

              {/* request description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Request Description</span>
                </label>
                <textarea
                  {...requestRegister('request_description', { required: true })}
                  placeholder="Request details..."
                  className="textarea textarea-bordered w-full"
                />
              </div>

              {/* preferred pickup time */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Preferred Pickup Time</span>
                </label>
                <input
                  type="time"
                  {...requestRegister('pickup_time', { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" onClick={() => setShowRequestModal(false)} className="btn">Cancel</button>
              </div>
            </form>
          </section>
        </dialog>
      )}

      {showReviewModal && (
        <dialog className="modal modal-open">
          <section className="modal-box">
            <h3 className="font-bold text-lg mb-2">Add Review</h3>
            <form onSubmit={handleReviewSubmit(submitReview)} className="space-y-3">
              <div className="space-y-4">
                {/* Reviewer Name */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Your Name</span>
                  </label>
                  <input
                    {...reviewRegister('reviewer_name')}
                    defaultValue={user.displayName}
                    className="input input-bordered w-full"
                    readOnly
                  />
                </div>

                {/* Reviewer Email */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Your Email</span>
                  </label>
                  <input
                    {...reviewRegister('reviewer_email')}
                    defaultValue={user.email}
                    className="input input-bordered w-full"
                    readOnly
                  />
                </div>

                {/* Review Description */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Review</span>
                  </label>
                  <textarea
                    {...reviewRegister('description', { required: true })}
                    placeholder="Write your review..."
                    className="textarea textarea-bordered w-full"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Rating (1-5)</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    placeholder="Give your rating out of five"
                    {...reviewRegister('rating', { required: true })}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" onClick={() => setShowReviewModal(false)} className="btn">Cancel</button>
              </div>
            </form>
          </section>
        </dialog>
      )}


    </section>
  );
};

export default DonationDetails;

