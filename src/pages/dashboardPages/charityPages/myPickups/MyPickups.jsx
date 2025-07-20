import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import queryClient from '../../../../api/queryClient';
import Loading from '../../../../components/loadingComponents/Loading';

const MyPickups = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // ✅ Fetch accepted requests
    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['my-pickups', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requests?charity_representative_email=${user?.email}&request_status=Accepted`);
            return res?.data;
        },
        enabled: !!user?.email,
    });

    // ✅ Confirm pickup mutation (uses requestId now)
    const mutation = useMutation({
        mutationFn: async (requestId) => {
            return axiosSecure.patch(`/requests/confirm-pickup/${requestId}`);
        },
        onSuccess: () => {
            Swal.fire('Success!', 'Pickup confirmed.', 'success');
            queryClient.invalidateQueries(['my-pickups', user?.email]);
            queryClient.invalidateQueries(['received-donations', user?.email]);
        },
        onError: () => {
            Swal.fire('Error!', 'Failed to confirm pickup.', 'error');
        }
    });

    const handleConfirmPickup = (requestId) => {
        Swal.fire({
            title: 'Confirm Pickup?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, confirm',
        }).then(result => {
            if (result.isConfirmed) {
                mutation.mutate(requestId);
            }
        });
    };

    if (isLoading) return <section><Loading /></section>;


    return (
        <div className="grid gap-4 md:grid-cols-2 my-10 pl-5">
            {requests.map(request => (
                <div key={request._id} className="card bg-gray-200 shadow-md shadow-white p-4 rounded-md border border-gray-500/50">
                    <img src={request.donation_image} className="w-full h-48 object-cover rounded mb-3" alt="donation" />
                    <h2 className="text-xl font-semibold mb-5 italic text-teal-800">{request.donation_title}</h2>
                    <div className="text-[15px] mb-3">
                        <p>
                            <span className="text-teal-700 italic font-semibold">Restaurant :</span>{' '}
                            <span className="text-teal-800">{request.restaurant_name}, {request.location}</span>
                        </p>

                        <p>
                            <span className="text-teal-700 italic font-semibold">Food Type :</span>{' '}
                            <span className="text-teal-800">{request.food_type}</span>
                        </p>

                        <p>
                            <span className="text-teal-700 italic font-semibold">Quantity :</span>{' '}
                            <span className="text-teal-800">{request.quantity} {request.unit}</span>
                        </p>

                        <p>
                            <span className="text-teal-700 italic font-semibold">Pickup Time :</span>{' '}
                            <span className="text-teal-800">{request.preferred_pickup_time} on {request.preferred_pickup_date}</span>
                        </p>

                        <p className=' my-3'>
                            <span className="text-teal-700 italic font-semibold">Status :</span>{' '}
                            <span className={`font-semibold ${request.picking_status === "Picked Up" ? 'text-green-800 bg-amber-300 py-1 px-3 rounded' : 'text-yellow-800 py-1 px-3 rounded bg-green-300'}`}>
                                {request.picking_status === "Picked Up" ? "Picked Up" : "Assigned"}
                            </span>
                        </p>
                    </div>

                    {/* ✅ Disable button if already picked up */}
                    {request.picking_status === 'Picked Up' ? (
                        <button
                            className="btn bg-gray-500 text-gray-600/60 mt-5 cursor-not-allowed shadow-2xl shadow-white"
                            disabled
                        >
                            Pick Up Confirmed
                        </button>
                    ) : (
                        <button
                            onClick={() => handleConfirmPickup(request._id)}
                            className="btn bg-teal-700 hover:bg-teal-900 text-gray-300 mt-5"
                        >
                            Confirm Pickup
                        </button>
                    )}

                </div>
            ))}
        </div>
    );
};

export default MyPickups;
