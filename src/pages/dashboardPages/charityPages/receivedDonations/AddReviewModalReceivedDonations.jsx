import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Loading from '../../../../components/loadingComponents/Loading';
import Swal from 'sweetalert2';

const AddReviewModalReceivedDonations = ({
  isOpen,
  onClose,
  request,
  userName = '',
  userEmail = '',
}) => {
  const [rating, setRating] = useState(5);
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const axiosSecure = useAxiosSecure();

  const id = request?.donation_id

  const { data: donation, isLoading } = useQuery({
    queryKey: ['donation-details', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/details/${id}?email=${userEmail}`);
      return res?.data;
    },
    enabled: !!id && !!userEmail
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const reviewData = {
      donation_id: request.donation_id,
      donation_title: request.donation_title,
      restaurant_name: request.restaurant_name,
      restaurant_email: request.restaurant_email,
      restaurant_representative_name: request.restaurant_representative_name,
      restaurant_representative_email: request.restaurant_representative_email,
      restaurant_location: donation?.location,
      donation_image: request.donation_image,
      reviewer_name: userName,
      reviewer_email: userEmail,
      description,
      rating,
      created_at: new Date(),
    };

    try {
      await axiosSecure.post('/reviews', reviewData); // Change base URL or use axiosSecure accordingly
      Swal.fire({
        icon: 'success',
        title: 'Review submitted successfully!',
      });
      setRating(5);
      setDescription('');
      onClose();
    } catch (error) {
      console.error('Failed to submit review:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Failed to submit review. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };
  if (isLoading) {
    return <Loading />
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => !submitting && onClose()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-60"
          leave="ease-in duration-200"
          leaveFrom="opacity-60"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  Add Review for {request.donation_title}
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="reviewerName" className="block text-sm font-medium text-gray-700">
                      Reviewer Name
                    </label>
                    <input
                      type="text"
                      id="reviewerName"
                      name="reviewer_name"
                      value={userName || ''}
                      readOnly
                      className="mt-1 block w-full rounded-md border border-gray-300 p-2 bg-gray-100 text-gray-700 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label htmlFor="donationTitle" className="block text-sm font-medium text-gray-700">
                      Donation Title
                    </label>
                    <input
                      type="text"
                      id="donationTitle"
                      name="donation_title"
                      value={request?.donation_title || ''}
                      readOnly
                      className="mt-1 block w-full rounded-md border border-gray-300 p-2 bg-gray-100 text-gray-700 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                      Rating
                    </label>
                    <select
                      id="rating"
                      name="rating"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                      disabled={submitting}
                      required
                    >
                      {[5, 4, 3, 2, 1].map((num) => (
                        <option key={num} value={num}>
                          {num} Star{num > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Review
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                      placeholder="Write your review here..."
                      disabled={submitting}
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => !submitting && onClose()}
                      className="inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 disabled:bg-teal-300"
                      disabled={submitting}
                    >
                      {submitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </div>
                </form>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddReviewModalReceivedDonations;
