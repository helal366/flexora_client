import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';

const DonationDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const { data: donation = {}, isLoading } = useQuery({
    queryKey: ['donation', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
    enabled: !!id,
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
      const res = await axiosSecure.patch(`/donations/${id}`, {
        request: {
          charity_name: user.displayName,
          charity_email: user.email,
          request_description: data.request_description,
          pickup_time: data.pickup_time,
          request_status: 'Pending',
        },
        status: 'Requested',
      });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Requested!', 'Donation request submitted.', 'success');
      setShowRequestModal(false);
      resetRequestForm();
    },
    onError: () => {
      Swal.fire('Error', 'Could not submit request', 'error');
    },
  });

  const { mutate: submitReview } = useMutation({
    mutationFn: async (data) => {
      const reviewData = {
        donation_id: id,
        reviewer_name: data.reviewer_name,
        description: data.description,
        rating: parseInt(data.rating),
      };
      const res = await axiosSecure.post('/donation-reviews', reviewData);
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

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{donation.donation_title}</h2>
      <p className="text-gray-600">{donation.description}</p>
      <p><strong>Restaurant:</strong> {donation.restaurant_name}</p>
      <p><strong>Location:</strong> {donation.location}</p>
      <p><strong>Quantity:</strong> {donation.quantity}</p>
      <p><strong>Status:</strong> {donation.status}</p>

      {donation.request && (
        <div className="mt-4 border-t pt-4">
          <p><strong>Requested by:</strong> {donation.request.charity_name}</p>
          <p><strong>Description:</strong> {donation.request.request_description}</p>
          <p><strong>Pickup Time:</strong> {donation.request.pickup_time}</p>
          <p><strong>Request Status:</strong> {donation.request.request_status}</p>
        </div>
      )}

      {/* Modals */}
      {showRequestModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">Request Donation</h3>
            <form onSubmit={handleRequestSubmit(submitRequest)} className="space-y-3">
              <input readOnly defaultValue={donation.donation_title} className="input input-bordered w-full" />
              <input readOnly defaultValue={donation.restaurant_name} className="input input-bordered w-full" />
              <input readOnly {...requestRegister('charity_name')} defaultValue={user.displayName} className="input input-bordered w-full" />
              <input readOnly {...requestRegister('charity_email')} defaultValue={user.email} className="input input-bordered w-full" />
              <textarea {...requestRegister('request_description', { required: true })} placeholder="Request details..." className="textarea textarea-bordered w-full" />
              <input type="time" {...requestRegister('pickup_time', { required: true })} className="input input-bordered w-full" />
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" onClick={() => setShowRequestModal(false)} className="btn">Cancel</button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {showReviewModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">Add Review</h3>
            <form onSubmit={handleReviewSubmit(submitReview)} className="space-y-3">
              <input {...reviewRegister('reviewer_name')} defaultValue={user.displayName} className="input input-bordered w-full" />
              <textarea {...reviewRegister('description', { required: true })} placeholder="Write your review..." className="textarea textarea-bordered w-full" />
              <input type="number" min="1" max="5" {...reviewRegister('rating', { required: true })} className="input input-bordered w-full" />
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" onClick={() => setShowReviewModal(false)} className="btn">Cancel</button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {/* Buttons */}
      <div className="mt-6 flex gap-3">
        <button onClick={() => setShowRequestModal(true)} className="btn btn-outline btn-info">Request Donation</button>
        <button onClick={() => setShowReviewModal(true)} className="btn btn-outline btn-secondary">Add Review</button>
      </div>
    </div>
  );
};

export default DonationDetails;

