import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import queryClient from '../../../../api/queryClient';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from './../../../../hooks/useAuth';

const ManageDonations = () => {
    const axiosSecure = useAxiosSecure();
    const {user}=useAuth()

    const fetchDonations = async () => {
        const res = await axiosSecure.get('/donations');
        return res.data;
    };
    const updateDonationStatus = async ({ id, status }) => {
        const res = await axiosSecure.patch(`/donations/${id}?email=${user?.email}`, { status, donation_status: "Available" });
        return res?.data;
    };

    const { data: donations = [], isPending, isError } = useQuery({
        queryKey: ['donations'],
        queryFn: fetchDonations,
    });

    const mutation = useMutation({
        mutationFn: updateDonationStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['donations'] }); // refetch donations after update
            Swal.fire({
                icon: 'success',
                title: 'Status Updated',
                text: 'Donation status has been updated successfully.',
            });
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Update Failed!',
                text: error?.response?.data?.message || 'Something went wrong.',
            });
        },
    });


    const handleVerify = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to verify this donation.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, verify it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                mutation.mutate({ id, status: 'Verified' });
            }
        });
    };

    const handleReject = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to reject this donation.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, reject it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                mutation.mutate({ id, status: 'Rejected' });
            }
        });
    };

    if (isPending) {
        return <p>Loading donations...</p>;
    }
    if (isError) {
        return <p>Error loading donations.</p>;
    }

    return (
        <div className="overflow-x-auto p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Manage Donations</h2>
            <table className="table w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-teal-100">
                        <th className="border border-gray-300 p-2">Donation Title</th>
                        <th className="border border-gray-300 p-2">Food Type</th>
                        <th className="border border-gray-300 p-2">Restaurant Name</th>
                        <th className="border border-gray-300 p-2">Restaurant Email</th>
                        <th className="border border-gray-300 p-2 whitespace-break-spaces">Restaurant Representative Name</th>
                        <th className="border border-gray-300 p-2">Donation Posted</th>
                        <th className="border border-gray-300 p-2">Posting Time</th>
                        <th className="border border-gray-300 p-2">Quantity</th>
                        <th className="border border-gray-300 p-2">Status</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {donations.length === 0 && (
                        <tr>
                            <td colSpan="10" className="text-center p-4">No donations found.</td>
                        </tr>
                    )}
                    {donations.map(donation => (
                        <tr key={donation._id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-2">{donation.donation_title}</td>
                            <td className="border border-gray-300 p-2">{donation.food_type}</td>
                            <td className="border border-gray-300 p-2">{donation.restaurant_name}</td>
                            <td className="border border-gray-300 p-2">{donation.restaurant_email}</td>
                            <td className="border border-gray-300 p-2 ">{donation.restaurant_representative_name}</td>
                            <td className="border border-gray-300 p-2"> {donation.posted_at?.split("T")[0]}</td>
                            <td className="border border-gray-300 p-2"> {donation.posted_at?.split("T")[1].slice(0, 8)}</td>
                            <td className="border border-gray-300 p-2">{donation.quantity} {donation.unit}</td>
                            <td className="border border-gray-300 p-2 font-semibold">
                                {donation.status}
                            </td>
                            <td className="border border-gray-300 p-2 space-x-2 whitespace-nowrap">
                                {(donation.status === 'Pending') && (
                                    <>
                                        <button
                                            className="btn btn-sm bg-teal-700 hover:bg-teal-800 text-gray-100"
                                            onClick={() => handleVerify(donation._id)}
                                            disabled={mutation.isPending}
                                        >
                                            Verify
                                        </button>
                                        <button
                                            className="btn btn-sm bg-red-700 hover:bg-red-800 text-gray-100"
                                            onClick={() => handleReject(donation._id)}
                                            disabled={mutation.isPending}
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                                {(donation.status === 'Verified' || donation.status === 'Rejected') && (
                                    <span className="italic text-gray-600">No actions</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {mutation.isLoading && <p className="mt-2 text-blue-600">Updating status...</p>}
            {mutation.isError && <p className="mt-2 text-red-600">Error updating status: {mutation.error.message}</p>}

        </div>
    );
};

export default ManageDonations;
