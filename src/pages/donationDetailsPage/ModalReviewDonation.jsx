import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ModalReviewDonation = ({ donation, handleReviewClose, isReviewOpen, userInfo, refetchReviews }) => {
    const reviewRef = useRef(null);
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            donation_title: donation?.donation_title || '',
            restaurant_name: donation?.restaurant_name || '',
            restaurant_representative_name: donation?.restaurant_representative_name || '',
            reviewer_name: userInfo?.user_by_email?.name || '',
            reviewer_email: userInfo?.user_by_email?.email || '',
        }
    });
    // console.log('user email from userInfo', userInfo?.user_by_email?.email)
    useEffect(() => {
        if (isReviewOpen && donation) {
            reset({
                donation_title: donation?.donation_title || '',
                restaurant_name: donation?.restaurant_name || '',
                restaurant_representative_name: donation?.restaurant_representative_name || '',
                reviewer_name: userInfo?.user_by_email?.name || '',
                reviewer_email: userInfo?.user_by_email?.email || '',
            })
            reviewRef?.current?.showModal()
        } else {
            reviewRef?.current?.close()
        }
    }, [isReviewOpen, donation, reset, userInfo]);

    const { mutate: addReview, isPending: reviewPending } = useMutation({
        mutationFn: async (reviewData) => {
            const res = await axiosSecure.post(`/reviews`, reviewData);
            return res?.data;
        },
        onSuccess: (data) => {
            reset();
            handleReviewClose();
            if (refetchReviews) refetchReviews();
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: data?.message || 'Request submitted successfully.',
            });
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || 'Something went wrong.';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
            });
        }
    })

    const reviewSubmit = (data) => {
        console.log({data})
        const reviewData = {
            donation_id: donation?._id,
            donation_title: donation?.donation_title,
            restaurant_name: donation?.restaurant_name,
            restaurant_email: donation?.restaurant_email,
            restaurant_representative_name: donation?.restaurant_representative_name,
            restaurant_representative_email: donation?.restaurant_representative_email,
            restaurant_location: donation?.location,
            donation_image: donation?.image,
            reviewer_name: data?.reviewer_name,
            reviewer_email: data?.reviewer_email,
            description: data?.description,
            rating: data?.rating,
            created_at: new Date()
        }
        addReview(reviewData)
    }

    return (
        <dialog ref={reviewRef} className='modal'>
            <div className="modal-box w-11/12 max-w-3xl mx-auto">
                <h3 className="font-bold text-lg text-center mb-5">Add Review for {donation?.donation_title}</h3>
                <div>
                    <form
                        className='space-y-4'
                        onSubmit={handleSubmit(reviewSubmit)}
                        method="dialog"
                    >
                        {/* donation title */}
                        <div>
                            <label className='two'>Donation title</label>
                            <input type="text" className='input input-bordered w-full' {...register('donation_title')} />
                        </div>
                        {/* restaurant name */}
                        <div>
                            <label className='two'>Restaurant Name</label>
                            <input type="text" className='input input-bordered w-full' {...register('restaurant_name')} />
                        </div>
                        {/* restaurant representative name */}
                        <div>
                            <label className='two'>Restaurant Representative Name</label>
                            <input type="text" className='input input-bordered w-full' {...register('restaurant_representative_name')} />
                        </div>
                        {/* reviewer name */}
                        <div>
                            <label className='two'>Reviewer Name</label>
                            <input type="text" className='input input-bordered w-full' {...register('reviewer_name')} />
                        </div>
                        {/* reviewer email */}
                        <div>
                            <label className='two'>Reviewer Email</label>
                            <input type="text" className='input input-bordered w-full' {...register('reviewer_email')} />
                        </div>

                        {/* rating */}
                        <div>
                            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                                Rating (1 to 5)
                            </label>
                            <select
                                id="rating"
                                {...register('rating', {
                                    required: 'Rating is required',
                                    setValueAs: (value) => Number(value),
                                    validate: (value) => {
                                        const num = Number(value);
                                        if (num < 1) return 'Rating must be at least 1';
                                        if (num > 5) return 'Rating cannot exceed 5';
                                        return true;
                                    }
                                })}
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                            >
                                {/* <option value="">Select Rating</option> */}
                                {[5, 4, 3, 2, 1].map((num) => (
                                    <option key={num} value={num}>
                                        {num} Star{num > 1 ? 's' : ''}
                                    </option>
                                ))}
                            </select>
                            {errors.rating && (
                                <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>
                            )}
                        </div>

                        {/* review  */}
                        <div>
                            <label className='two'>Review</label>
                            <textarea
                                type="text"
                                className='textarea textarea-bordered w-full' {...register('description', { required: 'Review Description is required.' })}
                                placeholder='Write your review here...'
                            />
                            {errors?.description && (
                                <p className='text-red-600 text-xs mt-1'>{errors.description?.message}</p>
                            )}
                        </div>

                        {/* buttons */}
                        <div className='modal-action'>
                            <button type='submit'
                                className='btn mr-5 text-gray-950 bg-teal-200 hover:bg-teal-700 hover:text-gray-200'
                            >
                                {reviewPending ? 'Submitting...' : 'Submit'}
                            </button>
                            <button onClick={handleReviewClose} className="btn text-gray-950 bg-red-100 hover:text-gray-200 hover:bg-red-800">Close</button>
                        </div>

                    </form>

                </div>
            </div>

        </dialog>
    );
};

export default ModalReviewDonation;