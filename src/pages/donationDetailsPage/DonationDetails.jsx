import React from 'react';
import { useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { useMutation, useQuery } from '@tanstack/react-query';
import Loading from '../../components/loadingComponents/Loading';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import DonationUI from './DonationUI';
import useUserRole from './../../hooks/useUserRole';
import ButtonOne from './ButtonOne';
import Swal from 'sweetalert2';
import queryClient from '../../api/queryClient';
import ModalRequestDonation from './ModalRequestDonation';
import { useState } from 'react';
import ReviewSection from './ReviewSection';
import ModalReviewDonation from './ModalReviewDonation';

const DonationDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const userEmail = user?.email;
    const { isUser, isCharity, userInfo } = useUserRole();
    // request modal
    const [isDisabled, setIsDisabled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    // review modal
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const handleReviewOpen = () => setIsReviewOpen(true);
    const handleReviewClose = () => setIsReviewOpen(false);
    // favorite
    const [alreadyFavorited, setAlreadyFavorited]=useState(false)

    const { data: donation, isLoading: donationGetLoading } = useQuery({
        queryKey: ['donation-details', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations/details/${id}?email=${userEmail}`);
            return res?.data;
        },
        enabled: !!id && !!userEmail
    });

    const totalFood = `${donation?.quantity} ${donation?.unit}${donation?.quantity > 1 ? 's' : ''}`;
    const formattedDate = new Date(donation?.pickup_date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
    const status = donation?.donation_status;
    const donationId = donation?._id;

    const { data: isExist, isLoading: existLoading } = useQuery({
        queryKey: ['isExist', donationId, userEmail],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requests/exist?email=${userEmail}&donationId=${donationId}`);
            return res?.data
        },
        enabled: !!donationId && !!userEmail
    });

    const {data: isFavorited, isLoading: favoritedGetLoading}=useQuery({
        queryKey: ['isFavorited', donationId, userEmail],
        queryFn: async()=>{
            const res=await axiosSecure.get(`/favorites/is_favorited?email=${userEmail}&donationId=${donationId}`);
            return res?.data?.favorited;
        },
        enabled: !!donationId && !!userEmail,
    });
    const { data: reviewsDonation = [], isLoading: reviewsLoading, refetch: refetchReviews } = useQuery({
        queryKey: ['reviews-by-donationId', donationId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${donationId}?email=${userEmail}`);
            return res?.data
        },
        enabled: !!donationId && !!userEmail,
    });

    const { mutate: addToFavorites, isPending: favoritePending } = useMutation({
        mutationFn: async ({ favoriteData }) => {
            const res = await axiosSecure.post(`/favorites?email=${userEmail}`, favoriteData);
            return res?.data
        },
        onSuccess: async () => {
            setAlreadyFavorited(true);
            await axiosSecure.patch(`/donations/add_favorite/${donationId}?email=${userEmail}`);
            queryClient.invalidateQueries({ queryKey: ['donation-details', id] });
            queryClient.invalidateQueries({ queryKey: ['isExist', donationId, userEmail] });

            Swal.fire('Success!', 'Added to Favorites successfully', 'success')

        },
        onError: (error) => {
            const message = error?.response?.data?.message || 'Failed to add favorite.';
            Swal.fire('Error!', message, 'error');
        },
    })
    const handleFavorites = () => {

        const favoriteData = {
            image: donation?.image,
            donation_title: donation?.donation_title,
            restaurant_name: donation?.restaurant_name,
            restaurant_email: donation?.restaurant_email,
            restaurant_representative_name: donation?.restaurant_representative_name,
            restaurant_representative_email: donation?.restaurant_representative_email,
            location: donation?.location,
            quantity: donation?.quantity,
            unit: donation?.unit,
            donation_status: donation?.donation_status,
            donationId: donation?._id,
            favoriter_name: user?.displayName,
            favoriter_email: userEmail,
            favoriter_role: userInfo?.user_by_email?.role,
        }
        addToFavorites({ favoriteData })
    };

    if (donationGetLoading || favoritePending || existLoading || favoritedGetLoading) {
        return <Loading />
    }

    return (
        <section className='one my-10 px-5 pt-5 bg-teal-50/50 max-w-4xl mx-auto'>
            <h1 className='font-bold text-3xl text-teal-900 italic mb-5'>Donation Details</h1>
            <img className='w-full min-h-32 max-h-[400px] one mb-5'
                src={donation?.image} alt={donation?.donation_title} />
            <h2 className='text-2xl font-semibold italic text-teal-800 my-4'>{donation?.donation_title} </h2>

            <DonationUI
                donation={donation}
                formattedDate={formattedDate}
                totalFood={totalFood}
                status={status} />

            <section className='my-10 flex gap-10 flex-wrap '>
                {(isUser || isCharity) && (
                    <>
                        <ButtonOne
                            bg='bg-yellow-600'
                            hoverBg='hover:bg-yellow-700'
                            textColor='text-gray-100'
                            onClick={handleFavorites}
                            isFavorited={isFavorited}
                            disabled={favoritePending || isFavorited || alreadyFavorited}
                        >
                            {favoritePending ? 'Adding...' : isFavorited?'Favorited': 'Add to Favorites'}
                        </ButtonOne>


                        <button
                            className='bg-[#0F828C] hover:bg-[#065084] text-gray-50 btn'
                            onClick={handleReviewOpen}
                        >
                            Add Review
                        </button>
                    </>
                )}

                {
                    isCharity && (
                        <>
                            {
                                (isExist?.exists || isDisabled) ? (
                                    <button disabled className='threeDisabled'>
                                        Donation Requested
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleOpen}
                                        className='btn bg-teal-700 hover:bg-teal-900 text-gray-100'>
                                        Request Donation
                                    </button>)
                            }
                        </>
                    )
                }
            </section>

            <ReviewSection
                reviewsDonation={reviewsDonation}
                reviewsLoading={reviewsLoading}
            />

            <ModalRequestDonation
                isOpen={isOpen}
                handleClose={handleClose}
                donation={donation}
                setIsDisabled={setIsDisabled}
            />

            <ModalReviewDonation
                isReviewOpen={isReviewOpen}
                handleReviewClose={handleReviewClose}
                donation={donation}
                userInfo={userInfo}
                refetchReviews={refetchReviews}
            />
        </section>
    );
};

export default DonationDetails;