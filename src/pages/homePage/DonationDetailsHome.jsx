import React, { useRef } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import AddReviewModalHome from './AddReviewModalHome';
import RequestDonationModalHome from './RequestDonationModalHome';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const DonationDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user, userRole } = useAuth();
    const reviewModalRef = useRef();
    const requestModalRef = useRef();

    const {
        data: donation,
        isLoading,
    } = useQuery({
        queryKey: ['donation', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations/${id}?email=${user?.email}`);
            return res.data;
        },
        enabled: !!id && !!user?.email,
    });

    const {
        data: reviews = [],
        refetch: refetchReviews,
    } = useQuery({
        queryKey: ['reviews', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews?donation_id=${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    const handleAddToFavorites = async () => {
        try {
            await axiosSecure.post('/favorites', {
                donation_id: id,
                user_email: user.email,
                saved_at: new Date(),
            });
            Swal.fire('Success', 'Added to favorites', 'success');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error?.message || 'Something went wrong!',
            });
        }
    };

    if (isLoading || !donation) return <div>Loading...</div>;

    const {
        title,
        description,
        food_type,
        quantity,
        pickup_instructions,
        restaurant_name,
        restaurant_location,
        pickup_time,
        status,
        image,
        restaurant_representative_name,
        restaurant_representative_email,
    } = donation;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Sticky Header */}
            <div className="sticky top-0 bg-white z-10 border-b pb-4">
                <h1 className="text-2xl font-bold text-teal-700">{title}</h1>
                <div className="mt-2 flex gap-4 items-center">
                    <img src={image} alt="donation" className="w-20 h-20 object-cover rounded" />
                    <div>
                        <p><strong>Restaurant:</strong> {restaurant_name}</p>
                        <p><strong>Representative:</strong> {restaurant_representative_name} ({restaurant_representative_email})</p>
                    </div>
                </div>
            </div>

            {/* Donation Info */}
            <div className="mt-6 space-y-3">
                <p><strong>Description:</strong> {description}</p>
                <p><strong>Food Type:</strong> {food_type}</p>
                <p><strong>Quantity:</strong> {quantity}</p>
                <p><strong>Pickup Instructions:</strong> {pickup_instructions}</p>
                <p><strong>Restaurant Location:</strong> {restaurant_location}</p>
                <p><strong>Pickup Time Window:</strong> {pickup_time}</p>
                <p><strong>Status:</strong> {status}</p>

                <div className="flex gap-4 mt-4">
                    <button onClick={handleAddToFavorites} className="btn btn-outline btn-sm">Save to Favorites</button>
                    {userRole === 'charity' && status === 'Available' && (
                        <button onClick={() => requestModalRef.current?.showModal()} className="btn btn-success btn-sm">Request Donation</button>
                    )}
                    {userRole === 'charity' && status === 'Accepted' && (
                        <button className="btn btn-warning btn-sm">Confirm Pickup</button>
                    )}
                </div>
            </div>

            {/* Review Section */}
            <div className="mt-10">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-semibold text-teal-600">Reviews</h2>
                    <button onClick={() => reviewModalRef.current?.showModal()} className="btn btn-sm btn-info text-white">Add Review</button>
                </div>
                <div className="max-h-[300px] overflow-y-auto space-y-4">
                    {reviews?.length === 0 ? (
                        <p>No reviews yet.</p>
                    ) : (
                        reviews.map((review) => (
                            <div key={review._id} className="border p-3 rounded shadow-sm">
                                <div className="flex items-center gap-3 mb-1">
                                    <img
                                        src={review.reviewer_image || '/default-avatar.png'}
                                        alt="Reviewer"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold">{review.reviewer_name}</p>
                                        <p className="text-xs text-gray-500">{review.reviewer_email}</p>
                                    </div>
                                </div>
                                <p className="text-sm">{review.description}</p>
                                <p className="text-sm text-yellow-600">Rating: {review.rating}/5</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modals */}
            <AddReviewModalHome
                modalRef={reviewModalRef}
                donationId={id}
                userName={user.displayName}
                userEmail={user.email}
                refetch={refetchReviews}
            />

            <RequestDonationModalHome
                modalRef={requestModalRef}
                donation={donation}
                user={user}
            />
        </div>
    );
};

export default DonationDetails;
