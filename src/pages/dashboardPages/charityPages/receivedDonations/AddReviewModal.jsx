import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Loading from '../../../../components/loadingComponents/Loading';
import queryClient from './../../../../api/queryClient';

const AddReviewModal = ({ isOpen, onClose, request, userName, userEmail }) => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const donationId = request?.donation_id;
  const { data: donation = {}, isLoading, isError } = useQuery({
    queryKey: ['donation', donationId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${donationId}?email=${userEmail}`);
      return res?.data;
    },
    enabled: !!donationId && !!userEmail, // avoid firing with undefined
    onSuccess: (data) => {
      console.log('✅ Donation fetched successfully:', data);
      queryClient.invalidateQueries({ queryKey: ['donation', donationId] })
    },
    onError: (error) => {
      console.error(' Error fetching donation:', error);
    },
  });
  console.log({donation})

  const mutation = useMutation({
    mutationFn: async (reviewData) => {
      const res = await axiosSecure.post('/reviews', reviewData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Success!', 'Review submitted successfully', 'success');
      reset();
      onClose();
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to submit review', 'error');
    },
  });

  const onSubmit = (data) => {
    const reviewData = {
      donation_id: donationId,
      donation_title: donation?.donation_title,
      donation_image_url: donation?.image,
      restaurant_name: donation?.restaurant_name,
      restaurant_email: donation?.restaurant_email,
      restaurant_representative_name:donation?.restaurant_representative_name,
      restaurant_representative_email:donation?.restaurant_representative_email,
      reviewer_name: userName,
      reviewer_email: userEmail,
      description: data.description,
      rating: Number(data.rating),
      created_at: new Date(),
    };
    mutation.mutate(reviewData);
  };

  if (!isOpen) return null;
  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <p>Something went wrong...</p>
  }

  return (
    <dialog open className="modal">
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
            <button
              type="submit"
              className="btn bg-teal-700 text-gray-100 hover:bg-teal-900"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Submitting...' : 'Submit'}
            </button>
            <button type="button" onClick={onClose} className="btn bg-red-100 hover:bg-red-200">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddReviewModal;
