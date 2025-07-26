import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';
import useCloudinaryImageUpload from '../../../../hooks/useCloudinaryImageUpload'; 
import useRestaurantProfile from '../../../../hooks/useRestaurantProfile';
import Loading from '../../../../components/loadingComponents/Loading';
import useAddDonation from '../../../../hooks/useAddDonation';

const pickupDate = new Date().toLocaleDateString(); // e.g., "7/17/2025"
const pickupTimeWindows = {
    date: pickupDate,
    breakfast: '11:00 AM – 12:30 PM',
    lunch: '4:00 PM – 5:30 PM',
    dinner: '10:15 PM – 11:45 PM',
};

const AddDonation = () => {
    const { user } = useAuth();
    const { mutateAsync: uploadImage } = useCloudinaryImageUpload();
    const [imagePreview, setImagePreview] = useState(null);
    const { restaurantProfile } = useRestaurantProfile();
    const { mutate: addDonation, isPending } = useAddDonation();
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    const selectedMeal = watch('meal_time'); 

    const onSubmit = async (data) => {
        const result = await Swal.fire({
            title: 'Confirm Donation',
            text: 'Do you want to submit this donation?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, submit it!',
            cancelButtonText: 'Cancel',
        });

        if (!result.isConfirmed) return;
        try {
            let imageUrl = '';
            if (data?.image[0]) {
                imageUrl = await uploadImage(data?.image[0]); // Upload to Cloudinary or any service
            }

            const donationData = {
                donation_title: data?.donation_title,
                food_type: data?.food_type,
                quantity: data?.quantity,
                unit: data?.unit,
                pickup_time_window: pickupTimeWindows[data?.meal_time],
                pickup_date: new Date().toISOString().slice(0, 10),
                restaurant_name: restaurantProfile?.organization_name || '',
                restaurant_email: restaurantProfile?.organization_email || '',
                location: restaurantProfile?.organization_location || '',
                restaurant_representative_name: user?.displayName,
                restaurant_representative_email: user?.email,
                image: imageUrl,
                status: 'Pending',
                posted_at: new Date().toISOString()
            };

            addDonation(donationData, {
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Donation Added!',
                    text: 'Your food donation has been submitted.',
                });
                reset();
                setImagePreview(null);
            },
            onError: (err) => {
                console.error(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err?.message || 'Failed to add donation.',
                });
            },
        });
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: 'Could not submit the donation. Try again.',
            });
        }
    };
    if (isPending) {
        return <Loading />
    }
    // const now = new Date().toISOString().slice(0, 16); // Format: "YYYY-MM-DDTHH:MM"

    return (
        <div className="w-full p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-4 text-center">Add Food Donation</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Donation title */}
                <div>
                    <label className="label text-teal-800 font-medium italic">Donation Title</label>
                    <input
                        className="input input-bordered w-full"
                        {...register('donation_title', { required: 'Donation title is required' })}
                    />
                    {errors.donation_title && (
                        <p className="text-red-500 text-sm mt-1">{errors.donation_title.message}</p>
                    )}
                </div>

                {/* food type */}
                <div>
                    <label className="label text-teal-800 font-medium italic">Food Type</label>
                    <select
                        className="select select-bordered w-full"
                        {...register('food_type', { required: 'Food type is required' })}
                    >
                        <option value="">-- Select Food Type --</option>
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
                    {errors.food_type && (
                        <p className="text-red-500 text-sm mt-1">{errors.food_type.message}</p>
                    )}
                </div>

                {/* quantity */}
                <div>
                    <label className="label text-teal-800 font-medium italic">Quantity</label>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        {...register('quantity', { required: 'Quantity is required' })}
                    />
                    {errors.quantity && (
                        <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
                    )}
                </div>
                {/* unit */}
                <div>
                    <label className="label text-teal-800 font-medium italic">Unit</label>
                    <select
                        className="select select-bordered w-full"
                        {...register('unit', { required: 'Unit is required' })}
                    >
                        <option value="">-- Select Unit --</option>
                        <option value="kg">kg</option>
                        <option value="portions">portions</option>
                        <option value="meal">meal</option>
                        <option value="pound">pound</option>
                        <option value="piece">piece</option>
                    </select>
                    {errors.unit && (
                        <p className="text-red-500 text-sm mt-1">{errors.unit.message}</p>
                    )}
                </div>

                {/* meal time */}
                <div>
                    <label className="label text-teal-800 font-medium italic">Meal Time</label>
                    <select
                        className="select select-bordered w-full"
                        {...register('meal_time', { required: 'Meal time is required' })}
                    >
                        <option value="">-- Select Meal Time --</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                    </select>

                    {errors.meal_time && (
                        <p className="text-red-500 text-sm mt-1">{errors.meal_time.message}</p>
                    )}

                    {selectedMeal && !errors.meal_time && (
                        <p className="text-xs text-green-600 mt-1">
                            Pickup Window: {pickupTimeWindows[selectedMeal]}
                        </p>
                    )}
                </div>

                {/* location */}
                <div>
                    <label className="label text-teal-800 font-medium italic">Location</label>
                    <input
                        className="input input-bordered w-full"
                        value={restaurantProfile?.organization_location || ''}
                        readOnly
                    />
                </div>

                {/* image upload */}
                <div>
                    <label className="label text-teal-800 font-medium italic">Image Upload</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="file-input file-input-bordered w-full"
                        {...register('image', { required: 'Image is required' })}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setImagePreview(URL.createObjectURL(file));
                            }
                        }}
                    />
                    {errors.image && (
                        <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                    )}
                    {imagePreview && !errors.image && (
                        <img
                            src={imagePreview}
                            alt="preview"
                            className="mt-2 w-32 h-24 object-cover rounded border"
                        />
                    )}
                </div>
                {/* restaurant name */}
                <div>
                    <label className="label text-teal-800 font-medium italic">Restaurant Name</label>
                    <input
                        className="input input-bordered w-full"
                        value={restaurantProfile?.organization_name || ''}
                        readOnly
                    />
                </div>
                {/* restaurant email */}
                <div>
                    <label className="label text-teal-800 font-medium italic">Restaurant Email</label>
                    <input
                        className="input input-bordered w-full"
                        value={restaurantProfile?.organization_email || ''}
                        readOnly
                    />
                </div>

                {/* add donation button */}
                <button
                    type="submit"
                    className="btn bg-teal-700 hover:bg-teal-900 text-gray-300 disabled:bg-teal-200 disabled:text-gray-500/50 w-full mb-16"
                    disabled={isPending}
                >
                   {isPending? 'Adding Donation...': 'Add Donation'} 
                </button>
            </form>
        </div>
    );
};

export default AddDonation;
