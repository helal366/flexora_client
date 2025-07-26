import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import useUserRole from '../../hooks/useUserRole';
import formattedDate from '../../utils/formattedDate';
import useAuth from '../../hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const ModalRequestDonation = ({ isOpen, handleClose, donation, setIsDisabled }) => {
    const { userInfo } = useUserRole()
    const { user } = useAuth()
    const modalRef = useRef(null);
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            donation_title: donation?.donation_title || '',
            restaurant_name: donation?.restaurant_name || '',
            restaurant_representative_name: donation?.restaurant_representative_name || '',
            charity_name: userInfo?.user_by_email?.organization_name || '',
            charity_email: userInfo?.user_by_email?.organization_email,
        }
    })
    useEffect(() => {
        if (isOpen && donation) {
            reset({
                donation_title: donation?.donation_title || '',
                restaurant_name: donation?.restaurant_name || '',
                restaurant_representative_name: donation?.restaurant_representative_name || '',
                charity_name: userInfo?.user_by_email?.organization_name || '',
                charity_email: userInfo?.user_by_email?.organization_email,
            })
            modalRef.current?.showModal()
        } else {
            modalRef.current?.close();
        }
    }, [isOpen, donation, reset, userInfo]);

    const { mutate: addDonationRequest, isPending: requestPending } = useMutation({
        mutationFn: async (requestData) => {
            const res = await axiosSecure.post(`/requests?email=${user?.email}`, requestData);
            return res?.data;
        },
        onSuccess: (data) => {
            setIsDisabled(true)
            reset()
            handleClose()
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
    const requestSubmit = (data) => {
        const dateString = data?.preferred_pickup_date
        const date = formattedDate(dateString)
        const requestData = {
            donation_id: donation?._id,
            donation_title: data?.donation_title,
            donation_image: donation?.image,
            food_type: donation?.food_type,
            quantity: donation?.quantity,
            donation_status: donation?.donation_status,
            unit: donation?.unit,
            preferred_pickup_date: date,
            preferred_pickup_time: data?.preferred_pickup_time,
            restaurant_name: data?.restaurant_name,
            restaurant_email: donation?.restaurant_email,
            restaurant_representative_name: donation?.restaurant_representative_name,
            restaurant_representative_email: donation?.restaurant_representative_email,
            request_description: data?.request_description,
            charity_name: data?.charity_name,
            charity_email: data?.charity_email,
            charity_logo: userInfo?.user_by_email?.organization_logo,
            charity_representative_name: user?.displayName,
            charity_representative_email: user?.email,
            request_status: 'Pending',
            created_at: new Date(),
        }
        addDonationRequest(requestData);
    }
    return (
        <dialog ref={modalRef} className="modal">
            <div className="modal-box w-11/12 max-w-5xl mx-auto">
                <h3 className="font-bold text-lg text-center mb-5">Submit your donation request.</h3>
                <div >
                    <form
                        className='space-y-4'
                        onSubmit={handleSubmit(requestSubmit)}
                        method="dialog">
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
                        {/* charity name */}
                        <div>
                            <label className='two'>Charity Name</label>
                            <input type="text" className='input input-bordered w-full' {...register('charity_name')} />
                        </div>
                        {/* charity email */}
                        <div>
                            <label className='two'>Charity Email</label>
                            <input type="email" className='input input-bordered w-full' {...register('charity_email')} />
                        </div>

                        {/* request description */}
                        <div>
                            <label className='two'>Request Description</label>
                            <textarea type="text" className='textarea textarea-bordered w-full' {...register('request_description', { required: 'Request Description is required.' })} />
                            {errors?.request_description && (
                                <p className='text-red-600 text-xs mt-1'>{errors.request_description?.message}</p>
                            )}
                        </div>
                        {/* preferred pickup date */}
                        <div>
                            <label className='two'>Preferred Pickup Date</label>
                            <input type="date" className='input input-bordered w-full' {...register('preferred_pickup_date', { required: 'Preferred Pickup Date is required.' })} />
                        </div>
                        {errors?.preferred_pickup_date && (
                            <p className='text-red-600 text-xs mt-1'>{errors.preferred_pickup_date?.message}</p>
                        )}
                        {/* preferred pickup time */}
                        <div>
                            <label className='two'>Preferred Pickup Time</label>
                            <input type="time" className='input input-bordered w-full' {...register('preferred_pickup_time', { required: 'Preferred Pickup time is required.' })} />
                        </div>
                        {errors?.preferred_pickup_time && (
                            <p className='text-red-600 text-xs mt-1'>{errors.preferred_pickup_time?.message}</p>
                        )}
                        {/* buttons */}
                        <div className='modal-action'>
                            <button type='submit'
                                className='btn mr-5 text-gray-950 bg-teal-200 hover:bg-teal-700 hover:text-gray-200'
                                disabled={requestPending}>
                                {requestPending ? 'Submitting...' : 'Submit'}
                            </button>
                            <button onClick={handleClose} className="btn text-gray-950 bg-red-100 hover:text-gray-200 hover:bg-red-800">Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default ModalRequestDonation;