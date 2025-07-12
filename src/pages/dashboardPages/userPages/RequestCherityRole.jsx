import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import queryClient from './../../../api/queryClient';


const RequestCherityRole = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth();
    const userEmail = user?.email;
    const userName = user?.displayName
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const stripe = useStripe();
    const elements = useElements();

    const createPaymentIntent = useMutation({
        mutationFn: async () => {
            const paymentIntentRes = await axiosSecure.post('/create-payment-intent', { amount: 50 })
            return paymentIntentRes?.data?.clientSecret
        }
    })

    const saveTransection = useMutation({
        mutationFn: async (transectionData) => {
            const saveTransectionRes = await axiosSecure.post('/save-transection', transectionData)
            return saveTransectionRes
        }
    })

    const patchCharityRequest = useMutation({
        mutationFn: async (patchData) => {
            const charityRequestRes = await axiosSecure.patch(`/users/charity_request/${userEmail}`, patchData)
            return charityRequestRes
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries(['userInfo', userEmail])
        }
    })
    const onSubmit = async (formData) => {
        if (!stripe || !elements) {
            Swal.fire({
                icon: 'error',
                title: 'Stripe is not loaded yet!',
                showConfirmButton: true,
                timer: 1500
            })
            return
        }
        const card = elements.getElement(CardElement);
        if (!card) {
            Swal.fire({
                icon: 'error',
                title: 'Card element not found!',
                timer: 1500,
                showConfirmButton: true
            })
        }
        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card
            });
            if (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Create payment method failed!',
                    text: `${error}`,
                    showConfirmButton: true
                })
                console.log('error from create payment method', error)
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Create payment method successful!',
                    text: `${paymentMethod}`,
                    showConfirmButton: true
                })
                console.log('[Payment method]', paymentMethod)
            }
            //  todo
            // Optional: show loader or disable button here

            // clientsecret
            const clientSecret = await createPaymentIntent.mutateAsync();

            // paymentIntent 
            const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name: userName,
                        email: userEmail
                    }
                }
            });
            if (paymentIntent.status === 'succeeded') {
                // save transection
                await saveTransection.mutateAsync({
                    transection_id: paymentIntent.id,
                    amount: 50,
                    currency: 'USD',
                    user_email: userEmail,
                    user_name: userName,
                    purpose: 'Charity role request',

                })
            }
            // PATCH user in DB with organization_name, mission, role
            const res = await patchCharityRequest.mutateAsync({
                organization_name: formData?.organization_name,
                mission: formData?.mission,
                transection_id: paymentIntent.id, //stripe's id
                amount: 50,
                currency: 'USD'
            });
            if (res?.data?.updateResult?.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Charity role request submitted successfully.',
                    timer: 1500
                }),
                    reset()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Payment or update failed!',
                    timer: 1500
                })
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Payment or update failed!',
                text: `${err?.message}`,
                showConfirmButton: true
            });
            console.log(err)
        }
    }
    return (
        <section className='max-w-4xl mx-auto my-8 bg-white p-6 rounded shadow-lg shadow-gray-600'>
            <h2 className='font-semibold text-2xl text-center mb-4'>
                Request charity role
            </h2>

            {/* Status indicators */}
            <div className="mb-4 space-y-1 text-sm text-teal-700 font-medium">
                {createPaymentIntent.isPending && <p>🔄 Creating payment intent...</p>}
                {saveTransection.isPending && <p>💾 Saving payment details...</p>}
                {patchCharityRequest.isPending && <p>📥 Updating charity request...</p>}
            </div>
            <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                {/* name */}
                <div>
                    <label className='label text-teal-900 font-medium'>Name</label>
                    <input type='text'
                        value={userName}
                        readOnly
                        className='input w-full' />
                </div>
                {/* email */}
                <div>
                    <label className='label text-teal-900 font-medium'>Email</label>
                    <input type='email'
                        value={userEmail}
                        readOnly
                        className='input w-full' />
                </div>
                {/* organization name */}
                <div>
                    <label className='label text-teal-900 font-medium'>Organization Name</label>
                    <input type='text'
                        className='input w-full'
                        placeholder='Organization Name'
                        {...register('organization_name', { required: 'Organization name is required.' })}
                    />
                    {errors?.organization_name && <p className='text-xs text-red-500'>{errors.organization_name?.message}</p>}
                </div>
                {/* mission statement */}
                <div>
                    <label className='label text-teal-900 font-medium'>Mission Statement</label>
                    <textarea
                        rows={10}
                        className='textarea w-full'
                        placeholder='Describe your mission'
                        {...register('mission', { required: 'Mission statement is required' })}
                    />
                    {errors?.mission && <p className='text-xs text-red-500'>{errors.mission?.message} </p>}
                </div>
                {/* stripe card element */}
                <div className='p-4 border rounded'>
                    <p className='text-lg font-medium mb-3'>Payment amount:
                        <span className='text-green-800 font-semibold ml-2'>
                            $50
                        </span>
                    </p>
                    <CardElement className='p-2 border border-gray-400/50 shadow-md bg-teal-100 min-h-[50px]' />
                    {/* payment  */}
                    <button type='submit' disabled={!stripe}
                        className='btn bg-teal-700 cursor-pointer w-full text-gray-100 mt-4'>
                        Pay $50
                    </button>
                </div>
            </form>
        </section>
    );
};

export default RequestCherityRole;