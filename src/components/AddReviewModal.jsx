import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

const AddReviewModal = ({ isOpen, closeModal, onSubmitReview, loading, defaultReviewerName }) => {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      reviewer_name: defaultReviewerName,  // autofill here
    }
  });
   useEffect(() => {
    setValue('reviewer_name', defaultReviewerName);
  }, [defaultReviewerName, setValue]);

  const handleReviewSubmit = async (data) => {
    await onSubmitReview(data);
    reset();
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add a Review
                </Dialog.Title>
                <form onSubmit={handleSubmit(handleReviewSubmit)} className="mt-4 space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full input input-bordered"
                    {...register('reviewer_name', { required: true })}
                  />
                  <textarea
                    placeholder="Your Review"
                    className="w-full textarea textarea-bordered"
                    rows={4}
                    {...register('description', { required: true })}
                  />
                  <input
                    type="number"
                    placeholder="Rating (1–5)"
                    min="1"
                    max="5"
                    className="w-full input input-bordered"
                    {...register('rating', {
                      required: true,
                      min: 1,
                      max: 5,
                      valueAsNumber: true,
                    })}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="btn btn-outline"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? 'Submitting...' : 'Submit Review'}
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

export default AddReviewModal;
