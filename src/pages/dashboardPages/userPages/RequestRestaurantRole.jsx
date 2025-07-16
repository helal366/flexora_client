import React, { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import Loading from '../../../components/loadingComponents/Loading';
import useCloudinaryImageUpload from '../../../hooks/useCloudinaryImageUpload';

const RequestRestaurantRole = () => {
    const { user } = useAuth();
    const userName = user?.displayName;
    const userEmail = user?.email;
    const navigate = useNavigate();
    const [restaurantLoading, setRestaurantLoading] = useState(false)
    const axiosSecure = useAxiosSecure();
    const { mutateAsync: uploadImage, isPending, isError, error } = useCloudinaryImageUpload();
    const [uploadLogo, setUploadLogo] = useState('')
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
        setRestaurantLoading(true)
        const file = data?.organization_logo?.[0];
        if (!file) {
            Swal.fire({
                icon: 'error',
                title: 'Image Missing!',
                text: 'Please upload a profile image.',
                showConfirmButton: true
            });
            return;
        }

        // cloudinary image upload by hook
        try {
            const uploadedUrl = await uploadImage(file)
            setUploadLogo(uploadedUrl)
        } catch (err) {
            Swal.fire({
                icon: 'error', title: 'Upload failed!', text: err?.message, showConfirmButton: true, timer: 2500
            });
            return;
        }


        try {

            // format mobile number to start with +880
            let formattedContact = data?.organization_contact ? data.organization_contact.trim() : '';
            if (formattedContact.startsWith('0')) {
                formattedContact = '+880' + formattedContact.slice(1)
            }
            // patch user in database
            const res = await patchRestaurantRequest.mutateAsync({
                organization_name: data?.organization_name,
                organization_tagline: data?.organization_tagline,
                mission: data?.mission,
                organization_email: data?.organization_email,
                organization_contact: formattedContact,
                organization_location: data?.organization_location,
                organization_address: data?.organization_address,
                organization_logo: uploadLogo,
                role: 'restaurant_role_request',
                status: 'Pending',
                organization_request_time: new Date()
            })
            if (res?.data?.updateResult?.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Restaurant role request submitted successfully.',
                    timer: 1500
                }),
                    reset();
                setRestaurantLoading(false)
                navigate('/')
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
            });
            setRestaurantLoading(false)
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
                        {...register('organization_name', { required: 'Restaurant name is required.' })}
                    />
                    {errors?.organization_name && <p className='text-xs text-red-500'>{errors.organization_name?.message}</p>}
                </div>
                {/* restaurant tagline */}
                <div>
                    <label className='label text-teal-900 font-medium'>Restaurant Tag Line</label>
                    <input type="text" className='input w-full'
                        placeholder='Restaurant tag line'
                        {...register('organization_tagline', { required: 'Restaurant tag line is required.' })}
                    />
                    {errors?.organization_tagline && <p className='text-xs text-red-500'>{errors.organization_tagline?.message}</p>}
                </div>
                {/* restaurant mission */}
                <div>
                    <label className='label text-teal-900 font-medium'>Restaurant Mission</label>
                    <input type="text" className='input w-full'
                        placeholder='Restaurant mission'
                        {...register('mission', { required: 'Restaurant mission is required.' })}
                    />
                    {errors?.mission && <p className='text-xs text-red-500'>{errors.mission?.message}</p>}
                </div>
                {/* restaurant email */}
                <div>
                    <label className='label text-teal-900 font-medium'>Restaurant Email</label>
                    <input type="text" className='input w-full'
                        placeholder='Restaurant email'
                        {...register('organization_email', { required: 'Restaurant email is required.' })}
                    />
                    {errors?.organization_email && <p className='text-xs text-red-500'>{errors.organization_email?.message}</p>}
                </div>
                {/* restaurant location */}
                <div>
                    <label className='label text-teal-900 font-medium'>Restaurant Location</label>
                    <input type="text" className='input w-full'
                        placeholder='Restaurant location'
                        {...register('organization_location', { required: 'Restaurant location is required.' })}
                    />
                    {errors?.organization_location && <p className='text-xs text-red-500'>{errors.organization_location?.message}</p>}
                </div>
                {/* restaurant contact number */}
                <div>
                    <label className='label text-teal-900 font-medium'>Restaurant Contact Number</label>
                    <input type="tel" inputMode='numeric' maxLength={11} className='input w-full'
                        placeholder='Restaurant contact number'
                        {...register('organization_contact', { required: 'Restaurant contact number is required.', pattern: { value: /^01[3-9]\d{8}$/, message: 'Please provide 11 digit Bangladeshi mobile number.' } })}
                    />
                    {errors?.organization_contact && <p className='text-xs text-red-500'>{errors.organization_contact?.message}</p>}
                </div>
                {/* restaurant logo upload */}
                <div>
                    <label className='label text-teal-900 font-medium'>Upload restaurant logo</label>
                    <input type="file" accept='image/*' className='input w-full'
                        placeholder='Restaurant logo'
                        {...register('organization_logo', { required: 'Restaurant logo is required.' })}
                    />
                    {errors?.organization_logo && <p className='text-xs text-red-500'>{errors.organization_logo?.message}</p>}
                </div>
                {/* restaurant address */}
                <div>
                    <label className='label text-teal-900 font-medium'>Restaurant address</label>
                    <textarea
                        rows={5}
                        className='textarea w-full'
                        placeholder='Restaurant address here!'
                        {...register('organization_address', { required: 'Restaurant address is required' })}
                    />
                    {errors?.organization_address && <p className='text-xs text-red-500'>{errors.organization_address?.message} </p>}
                </div>
                {
                    <div className="my-4 space-y-1 text-sm text-teal-700 font-medium">
                        {restaurantLoading && <Loading />}
                        {patchRestaurantRequest.isPending && <p>📥 Updating charity request...</p>}
                    </div>
                }
                <div>
                    <button type='submit'
                        className='btn bg-teal-900 text-gray-100 rounded border w-full'
                        disabled={patchRestaurantRequest.isPending || restaurantLoading || isPending}>
                        Submit
                    </button>
                </div>
                {isPending && <p className="text-blue-500 font-medium">Uploading image...</p>}
                {isError && <p className="text-red-600 text-sm">Upload error: {error?.message}</p>}
            </form>
        </section>
    );
};

export default RequestRestaurantRole;