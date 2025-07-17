import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useCloudinaryImageUpload from '../../../../hooks/useCloudinaryImageUpload';  // optional custom hook
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
    const axiosSecure = useAxiosSecure();
    const { uploadImage } = useCloudinaryImageUpload(); // optional
    const [imagePreview, setImagePreview] = useState(null);
    const { restaurantProfile } = useRestaurantProfile();
    const { mutate: addDonation, isPending } = useAddDonation();

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    const selectedMeal = watch('meal_time'); // to derive time window

    const onSubmit = async (data) => {
        try {
            let imageUrl = '';
            if (data.image[0]) {
                imageUrl = await uploadImage(data.image[0]); // Upload to Cloudinary or any service
            }

            const donationData = {
                donation_title: data.donation_title,
                food_type: data.food_type,
                quantity: data.quantity,
                unit: data.unit,
                pickup_time_window: pickupTimeWindows[data.meal_time],
                restaurant_name: restaurantProfile?.organization_name || '',
                restaurant_email: restaurantProfile?.organization_email || '',
                location: data.location,
                user_name: user?.displayName,
                user_email: user?.email,
                image: imageUrl,
                status: 'Pending',
                created_at: new Date().toISOString()
            };

            await axiosSecure.post('/donations', donationData);

            Swal.fire({
                icon: 'success',
                title: 'Donation Added!',
                text: 'Your food donation has been submitted for review.',
            });

            reset();
            setImagePreview(null);
            addDonation(data);
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
    const now = new Date().toISOString().slice(0, 16); // Format: "YYYY-MM-DDTHH:MM"

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-4 text-center">Add Food Donation</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Donation title */}
                <div>
                    <label className="label">Donation Title</label>
                    <input className="input input-bordered w-full" {...register('donation_title', { required: true })} />
                    {errors.donation_title && <span className="text-red-500 text-xs">Required</span>}
                </div>
                {/* food type */}
                <div>
                    <label className="label">Food Type</label>
                    <select className="select select-bordered w-full" {...register('food_type', { required: true })}>
                        <option value="">-- Select Food Type --</option>
                        <option value="cooked_meal">Cooked Meal</option>
                        <option value="cooked_rice_dish">Cooked Rice Dish</option>
                        <option value="Traditional_meal">Traditional Meal</option>
                        <option value="bakery">Bakery</option>
                        <option value="produce">Produce</option>
                        <option value="dairy">Dairy</option>
                        <option value="meat">Meat</option>
                        <option value="beverages">Beverages</option>
                        <option value="dry-goods">Dry Goods</option>
                        <option value="snack">Snack</option>
                        <option value="soft_drinks">Soft Drinks</option>
                    </select>
                </div>
                {/* quantity */}
                <div >
                    <label className="label">Quantity</label>
                    <input type="number" className="input input-bordered w-full" {...register('quantity', { required: true })} />
                </div>
                {/* unit */}
                <div >
                    <label className="label">Unit</label>
                    <select className="select select-bordered w-full" {...register('unit', { required: true })}>
                        <option value="kg">kg</option>
                        <option value="portions">portions</option>
                        <option value="meal">meal</option>
                        <option value="pound">pound</option>
                        <option value="piece">piece</option>
                    </select>
                </div>
                {/* meal time */}
                <div>
                    <label className="label">Meal Time</label>
                    <select className="select select-bordered w-full" {...register('meal_time', { required: true })}>
                        <option value="">-- Select Meal Time --</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                    </select>
                    {selectedMeal && (
                        <p className="text-xs text-green-600 mt-1">
                            Pickup Window: {pickupTimeWindows[selectedMeal]}
                        </p>
                    )}
                </div>

                {/* donation post time */}
                <div>
                    <label className="label">Donation Post Time</label>
                    <input
                        type="datetime-local"
                        defaultValue={now}
                        {...register('post_time', { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* location */}
                <div>
                    <label className="label">Location</label>
                    <input type="text" className="input input-bordered w-full" placeholder="e.g., Motijheel" {...register('location', { required: true })} />
                </div>
                {/* image upload */}
                <div>
                    <label className="label">Image Upload</label>
                    <input type="file" accept="image/*" className="file-input file-input-bordered w-full" {...register('image')}
                        onChange={(e) => setImagePreview(URL.createObjectURL(e.target.files[0]))}
                    />
                    {imagePreview && (
                        <img src={imagePreview} alt="preview" className="mt-2 w-32 h-24 object-cover rounded border" />
                    )}
                </div>
                <div>
                    <label className="label">Restaurant Name</label>
                    <input
                        className="input input-bordered w-full"
                        value={restaurantProfile?.organization_name || ''}
                        readOnly
                    />
                </div>

                <div>
                    <label className="label">Restaurant Email</label>
                    <input
                        className="input input-bordered w-full"
                        value={restaurantProfile?.organization_email || ''}
                        readOnly
                    />
                </div>

                <div>
                    <label className="label">Account Created At</label>
                    <input
                        className="input input-bordered w-full"
                        value={restaurantProfile?.created_at ? new Date(restaurantProfile.created_at).toLocaleString() : ''}
                        readOnly
                    />
                </div>

                {/* add donation button */}
                <button type="submit" className="btn btn-primary w-full">Add Donation</button>
            </form>
        </div>
    );
};

export default AddDonation;
