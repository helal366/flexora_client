import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import queryClient from '../../api/queryClient';
import { useMutation } from '@tanstack/react-query';

const DonationDetails = ({ donation }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

const reviewMutation = useMutation({
  mutationFn: async (reviewData) => {
    const res = await axiosSecure.post('/donation-reviews', reviewData);
    return res.data;
  },
  onSuccess: () => {
    Swal.fire('Review Submitted!', '', 'success');
    setShowReviewModal(false);
    queryClient.invalidateQueries({ queryKey: ['donation-reviews', donation._id] }); // optional if fetching review list
  },
  onError: (err) => {
    console.error(err);
    Swal.fire('Error', 'Failed to submit review.', 'error');
  }
});


  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const requestData = {
      donation_id: donation._id,
      donation_title: donation.donation_title,
      restaurant_name: donation.restaurant_name,
      charity_name: form.charity_name.value,
      charity_email: form.charity_email.value,
      request_description: form.request_description.value,
      pickup_time: form.pickup_time.value,
      donation_status: "Requested",
    };

    try {
      await axiosSecure.post('/donation-requests', requestData);
      Swal.fire('Requested!', 'Donation request submitted.', 'success');
      setShowRequestModal(false);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Could not submit request', 'error');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const reviewData = {
      donation_id: donation._id,
      reviewer_name: form.reviewer_name.value,
      description: form.description.value,
      rating: parseInt(form.rating.value),
    };
    reviewMutation.mutate(reviewData);
  };

  return (
    <div>
      {/* Request Donation Modal */}
      {showRequestModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">Request Donation</h3>
            <form onSubmit={handleRequestSubmit} className="space-y-3">
              <input readOnly defaultValue={donation.donation_title} className="input input-bordered w-full" />
              <input readOnly defaultValue={donation.restaurant_name} className="input input-bordered w-full" />
              <input name="charity_name" defaultValue={user.displayName} className="input input-bordered w-full" />
              <input name="charity_email" defaultValue={user.email} className="input input-bordered w-full" />
              <textarea name="request_description" required placeholder="Request details..." className="textarea textarea-bordered w-full" />
              <input name="pickup_time" required type="time" className="input input-bordered w-full" />
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" onClick={() => setShowRequestModal(false)} className="btn">Cancel</button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">Add Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-3">
              <input name="reviewer_name" defaultValue={user.displayName} className="input input-bordered w-full" />
              <textarea name="description" required placeholder="Write your review..." className="textarea textarea-bordered w-full" />
              <input name="rating" type="number" min="1" max="5" required className="input input-bordered w-full" />
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" onClick={() => setShowReviewModal(false)} className="btn">Cancel</button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {/* Trigger Buttons */}
      <div className="mt-6 flex gap-3">
        <button onClick={() => setShowRequestModal(true)} className="btn btn-outline btn-info">Request Donation</button>
        <button onClick={() => setShowReviewModal(true)} className="btn btn-outline btn-secondary">Add Review</button>
      </div>
    </div>
  );
};

export default DonationDetails;
