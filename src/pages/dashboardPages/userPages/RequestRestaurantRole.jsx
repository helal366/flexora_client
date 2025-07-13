import React, { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const RequestRestaurantRole = () => {
    const { user } = useAuth();
    const userName = user?.displayName;
    const userEmail = user?.email;
    const axiosSecure = useAxiosSecure()
    const { register, formState: { errors }, handleSubmit, reset } = useForm()
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const patchRestaurantRequest = useMutation({
        mutationFn: async (patchData) => {
            const restaurantRequestRes = await axiosSecure.patch(`/users/role_request/${userEmail}`, patchData)
            return restaurantRequestRes
        },
        onSuccess: (res) => {
            if (res?.data?.updateResult?.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Restaurant role request submitted successfully.',
                    timer: 1500
                });
                reset();
            }
        },
        onError: () => {
            Swal.fire({
                icon: 'error',
                title: 'Update failed!',
                timer: 1500
            });
        }
    })
    const onSubmit = async (data) => {
        // image file
        const file = data?.restaurant_logo?.[0];
        if (!file) {
            Swal.fire({
                icon: 'error',
                title: 'Image Missing!',
                text: 'Please upload a profile image.',
                showConfirmButton: true
            });
            return;
        }

        // cloudinary image upload
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", `${import.meta.env.VITE_upload_preset}`);
        formData.append("cloud_name", `${import.meta.env.VITE_cloud_name}`)
        try {
            const result = await axios.post(`${import.meta.env.VITE_cloudinary_url}`, formData);
            const uploadedRestaurantLogo = result?.data?.secure_url;
            console.log('restaurent request logo', uploadedRestaurantLogo);
            if (!uploadedRestaurantLogo) {
                throw new Error('Failed to upload restaurant logo.')
            }
            // format mobile number to start with +880
            let formattedContact = data?.restaurant_contact ? data.restaurant_contact.trim() : '';
            if (formattedContact.startsWith('0')) {
                formattedContact = '+880' + formattedContact.slice(1)
            }
            // patch user in database
            const res = await patchRestaurantRequest.mutateAsync({
                restaurant_name: data?.restaurant_name,
                restaurant_tagline: data?.restaurant_tagline,
                restaurant_email: data?.restaurant_email,
                restaurant_contact: formattedContact,
                restaurant_location: data?.restaurant_location,
                restaurant_address: data?.restaurant_address,
                restaurant_logo: uploadedRestaurantLogo,
                role: 'restaurant_role_request',
                restaurant_request_time: new Date()
            })
            if (res?.data?.updateResult?.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Restaurant role request submitted successfully.',
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
                title: 'Something went wrong!',
                text: `${err}`,
                showConfirmButton: true
            })
        }
    }
    return (
        <section className='max-w-4xl mx-auto my-8 bg-white p-6 rounded shadow-lg shadow-gray-600'>
            <h2 className='font-semibold text-2xl text-center mb-4'>
                Request restaurant role
            </h2>
            <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                {/* user name */}
                <div>
                    <label className='label text-teal-900 font-medium'>Name</label>
                    <input type="text" value={userName} readOnly className='input w-full' />
                </div>
                {/* user email */}
                <div>
                    <label className='label text-teal-900 font-medium'>Email</label>
                    <input type="text" value={userEmail} readOnly className='input w-full' />
                </div>
                {/* restaurant name */}
                <div>
                    <label className='label text-teal-900 font-medium'>Restaurant Name</label>
                    <input type="text" className='input w-full'
                        placeholder='Restaurant name'
                        {...register('restaurant_name', { required: 'Restaurant name is required.' })}
                    />
                    {errors?.restaurant_name && <p className='text-xs text-red-500'>{errors.restaurant_name?.message}</p>}
                </div>
                {/* restaurant tagline */}
                <div>
                    <label className='label text-teal-900 font-medium'>Restaurant Tag Line</label>
                    <input type="text" className='input w-full'
                        placeholder='Restaurant tag line'
                        {...register('restaurant_tagline', { required: 'Restaurant tag line is required.' })}
                    />
                    {errors?.restaurant_tagline && <p className='text-xs text-red-500'>{errors.restaurant_tagline?.message}</p>}
                </div>
                {/* restaurant email */}
                <div>
                    <label className='label text-teal-900 font-medium'>Restaurant Email</label>
                    <input type="text" className='input w-full'
                        placeholder='Restaurant email'
                        {...register('restaurant_email', { required: 'Restaurant email is required.' })}
                    />
                    {errors?.restaurant_email && <p className='text-xs text-red-500'>{errors.restaurant_email?.message}</p>}
                </div>
                {/* restaurant location */}
                <div>
                    <label className='label text-teal-900 font-medium'>Restaurant Location</label>
                    <input type="text" className='input w-full'
                        placeholder='Restaurant location'
                        {...register('restaurant_location', { required: 'Restaurant location is required.' })}
                    />
                    {errors?.restaurant_location && <p className='text-xs text-red-500'>{errors.restaurant_location?.message}</p>}
                </div>
                {/* restaurant contact number */}
                <div>
                    <label className='label text-teal-900 font-medium'>Restaurant Contact Number</label>
                    <input type="tel" inputMode='numeric' maxLength={11} className='input w-full'
                        placeholder='Restaurant contact number'
                        {...register('restaurant_contact', { required: 'Restaurant contact number is required.', pattern: { value: /^01[3-9]\d{8}$/, message: 'Please provide 11 digit Bangladeshi mobile number.' } })}
                    />
                    {errors?.restaurant_contact && <p className='text-xs text-red-500'>{errors.restaurant_contact?.message}</p>}
                </div>
                {/* restaurant logo upload */}
                <div>
                    <label className='label text-teal-900 font-medium'>Upload restaurant logo</label>
                    <input type="file" accept='image/*' inputMode='numeric' maxLength={11} className='input w-full'
                        placeholder='Restaurant logo'
                        {...register('restaurant_logo', { required: 'Restaurant logo is required.' })}
                    />
                    {errors?.restaurant_logo && <p className='text-xs text-red-500'>{errors.restaurant_logo?.message}</p>}
                </div>
                {/* restaurant address */}
                <div>
                    <label className='label text-teal-900 font-medium'>Restaurant address</label>
                    <textarea
                        rows={5}
                        className='textarea w-full'
                        placeholder='Restaurant address here!'
                        {...register('restaurant_address', { required: 'Restaurant address is required' })}
                    />
                    {errors?.restaurant_address && <p className='text-xs text-red-500'>{errors.restaurant_address?.message} </p>}
                </div>
                <div>
                    <button type='submit' className='btn bg-teal-900 text-gray-100 rounded border w-full'>Submit</button>
                </div>
            </form>
        </section>
    );
};

export default RequestRestaurantRole;