import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useCloudinaryImageUpload from '../../../../hooks/useCloudinaryImageUpload';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';

const UpdateMyDonation = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState('');
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const { mutateAsync: uploadImage, isPending: imageUploading } = useCloudinaryImageUpload();

    // 1. Fetch existing donation data
    const { data: donation, isLoading } = useQuery({
        queryKey: ['donation', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations/${id}?email=${user?.email}`);
            return res.data;
        },
        enabled: !!id && !!user?.email,
    });

    // 2. Populate form when data arrives
    useEffect(() => {
        if (donation) {
            setValue('donation_title', donation.donation_title);
            setValue('food_type', donation.food_type);
            setValue('quantity', donation.quantity);
            setValue('unit', donation.unit);
            setValue('pickup_time_window', donation.pickup_time_window);
            setValue('location', donation.location);
            setValue('image', donation.image);
            setPreviewImage(donation.image);
        }
    }, [donation, setValue]);

    // 3. Submit handler
    const onSubmit = async (data) => {
        try {
            const updatedData = {
                ...data,
                quantity: parseFloat(data.quantity),
                updated_at: new Date(),
            };

            await axiosSecure.patch(`/donations/${id}`, updatedData);
            Swal.fire('Success!', 'Donation updated successfully.', 'success');
            navigate('/dashboard/my_donations');
        } catch (error) {
            console.error(error);
            Swal.fire('Error!', 'Failed to update donation.', 'error');
        }
    };

    // 4. Handle image file selection and upload
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const imageUrl = await uploadImage(file);
            setValue('image', imageUrl);
            setPreviewImage(imageUrl);
        } catch (error) {
            console.error('Image upload failed', error);
            Swal.fire('Error!', 'Image upload failed.', 'error');
        }
    };

    if (isLoading) return <div className="text-center py-10">Loading donation data...</div>;

    return (
        <section className="w-full py-6 pl-6 bg-gray-100 shadow-md rounded-md mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Update Donation</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block mb-1">Donation Title</label>
                    <input
                        {...register('donation_title', { required: true })}
                        className="input input-bordered w-full"
                        placeholder="Donation Title"
                    />
                    {errors.donation_title && <p className="text-red-500">Title is required</p>}
                </div>

                {/* Food Type */}
                <div>
                    <label className="block mb-1">Food Type</label>
                    <select {...register('food_type', { required: true })} className="select select-bordered w-full">
                        <option value="">Select Food Type</option>
                        <option value="Cooked Meal">Cooked Meal</option>
                        <option value="Cooked Rice Dish">Cooked Rice Dish</option>
                        <option value="Traditional Meal">Traditional Meal</option>
                        <option value="Bakery">Bakery</option>
                        <option value="Produce">Produce</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Meat">Meat</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Dry Goods">Dry Goods</option>
                        <option value="Snack">Snack</option>
                        <option value="Soft Drinks">Soft Drinks</option>
                    </select>
                    {errors.food_type && <p className="text-red-500">Food type is required</p>}
                </div>

                {/* Quantity & Unit */}
                <div >
                    <label className="block mb-1">Quantity</label>
                    <input
                        {...register('quantity', { required: true })}
                        type="number"
                        className="input input-bordered w-full"
                        placeholder="Quantity"
                    />
                    {errors.quantity && <p className="text-red-500">Quantity is required</p>}
                </div>
                <div>
                    <label className="block mb-1">Unit</label>
                    <select {...register('unit', { required: true })} className="select select-bordered w-full">
                        <option value="kg">kg</option>
                        <option value="portions">portions</option>
                        <option value="meal">meal</option>
                        <option value="pound">pound</option>
                        <option value="piece">piece</option>
                    </select>
                </div>

                {/* Pickup Time */}
                <div>
                    <label className="block mb-1">Pickup Time Window</label>
                    <input
                        {...register('pickup_time_window', { required: true })}
                        className="input input-bordered w-full"
                        placeholder="e.g. 3:00 PM – 5:00 PM"
                    />
                    {errors.pickup_time_window && <p className="text-red-500">Pickup time is required</p>}
                </div>

                {/* Location */}
                <div>
                    <label className="block mb-1">Pickup Location</label>
                    <input
                        {...register('location', { required: true })}
                        className="input input-bordered w-full"
                        placeholder="Pickup Location"
                    />
                    {errors.location && <p className="text-red-500">Location is required</p>}
                </div>

                {/* Image Preview and Upload */}
                <div>
                    <label className="block mb-1">Current Image</label>
                    {previewImage && (
                        <img src={previewImage} alt="Preview" className="w-12 h-12 rounded object-cover mb-2" />
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="file-input file-input-bordered w-full"
                    />
                </div>

                {/* Hidden input for image URL */}
                <input type="hidden" {...register('image', { required: true })} />
                {errors.image && <p className="text-red-500">Image is required</p>}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn bg-teal-500 hover:bg-teal-600 text-white disabled:text-gray-400 w-full"
                    disabled={imageUploading}
                >
                    {imageUploading ? 'Uploading Image...' : 'Update Donation'}
                </button>
            </form>
        </section>
    );
};

export default UpdateMyDonation;
