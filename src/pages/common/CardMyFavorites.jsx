import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import queryClient from '../../api/queryClient';

const CardMyFavorites = ({ favorite }) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const donationId = favorite?.donationId;
    const favoriteId = favorite?._id;
    const userEmail = user?.email;
    console.log({ donationId });

    const removeMutation = useMutation({
        mutationFn: async (favoriteId) => {
            const res = await axiosSecure.delete(`/favorites/remove?id=${favoriteId}&email=${userEmail}`);
            return res?.data;
        },
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Removed!',
                text: 'Donation removed from favorites.',
                timer: 2000,
                showConfirmButton: false,
            });
            queryClient.invalidateQueries(['favorites', userEmail]); // refetch favorites
        },
        onError: (error) => {
            const message = error?.response?.data?.message || 'Something went wrong!';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: message,
            });
        }
    });
    const handleRemove = (favoriteId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This donation will be removed from your favorites!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, remove it!',
        }).then((result) => {
            if (result.isConfirmed) {
                removeMutation.mutate(favoriteId);
            }
        });
    };

    return (
        <section className='card bg-gray-200 shadow-xl'>
            {/* image */}
            <figure>
                <img
                    className='max-h-60 w-full'
                    src={favorite?.image}
                    alt={favorite?.donation_title} />
            </figure>
            {/* body */}
            <div className='card-body'>
                <h2 className="card-title"> {favorite?.donation_title} </h2>
                <p> <span className='two'>Restaurant Name :</span> {favorite?.restaurant_name}</p>
                <p> <span className='two'>Restaurant Location :</span> {favorite?.location}</p>
                <p> <span className='two'>Donation Status :</span> {favorite?.donation_status}</p>
                <p> <span className='two'>Quantity :</span> {favorite?.quantity} {favorite?.unit}{favorite?.quantity > 0 ? 's' : ''}</p>
            </div>
            {/* button */}
            <div className='mx-6 mb-8 flex flex-wrap gap-5 justify-between'>
                <Link to={`/donations/${donationId}`}>
                    <button className='fourButton'>
                        Details
                    </button>
                </Link>

                <button
                    onClick={() => handleRemove(favoriteId)}
                    className='btn bg-red-500 hover:bg-red-800 text-gray-50'>
                    Remove
                </button>
            </div>
        </section>
    );
};

export default CardMyFavorites;