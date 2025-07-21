import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AddReviewModalHome = ({ donationId, userName, userEmail, refetch }) => {
  const modalRef = useRef();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  // Fetch donation data with useQuery
  const { data: donation, isLoading: donationLoading } = useQuery({
    queryKey: ['donation', donationId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${donationId}`);
      return res.data;
    },
    enabled: !!donationId,
  });

  // Mutation to submit review
  const mutation = useMutation({
    mutationFn: async (reviewData) => {
      const res = await axiosSecure.post('/reviews', reviewData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Success!', 'Review submitted successfully', 'success');
      refetch?.(); // Optionally refetch reviews
      modalRef.current.close();
      reset();
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to submit review', 'error');
    },
  });

  // Show modal handler
  const openModal = () => modalRef.current?.showModal();

  // Form submit
  const onSubmit = (data) => {
    if (!donation) {
      Swal.fire('Error', 'Donation data not loaded yet, try again shortly.', 'error');
      return;
    }

    const review = {
      donation_id: donationId,
      donation_title: donation.donation_title,
      restaurant_name: donation.restaurant_name,
      restaurant_email: donation.restaurant_email,
      restaurant_representative_name: donation.restaurant_representative_name,
      restaurant_representative_email: donation.restaurant_representative_email,
      donation_image: donation.image,
      reviewer_name: userName,
      reviewer_email: userEmail,
      description: data.description,
      rating: parseInt(data.rating, 10),
      created_at: new Date(),
    };

    mutation.mutate(review);
  };

  if (donationLoading) return <div>Loading donation info...</div>;

  return (
    <>
      <button onClick={openModal} className="btn bg-teal-700 text-white hover:bg-teal-800">
        Add Review
      </button>

      <dialog ref={modalRef} className="modal" id="add_review_modal_home">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4 text-teal-700">Add Your Review</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="font-semibold">Rating (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                {...register('rating', { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="font-semibold">Review Description</label>
              <textarea
                {...register('description', { required: true })}
                className="textarea textarea-bordered w-full"
                rows={4}
                placeholder="Share your experience..."
              />
            </div>

            <div className="modal-action">
              <button type="submit" className="btn bg-green-600 text-white hover:bg-green-700">
                Submit
              </button>
              <button type="button" onClick={() => modalRef.current.close()} className="btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AddReviewModalHome;
