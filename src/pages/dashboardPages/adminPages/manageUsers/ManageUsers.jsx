import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Loading from '../../../../components/loadingComponents/Loading';
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';
import queryClient from '../../../../api/queryClient';

const ManageUsers = () => {
    const { user } = useAuth();
    const adminEmail = user?.email;
    const adminName = user?.name;
    const axiosSecure = useAxiosSecure()
    const { data: users = [], isPending } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/all');
            return res?.data
        }
    });
    // console.log(users)
    const changeRoleMutation = useMutation({
        mutationFn: async ({ candidateEmail, updateInfo }) => {
            return await axiosSecure.patch(`user/direct_role_change/${adminEmail}/${candidateEmail}`, updateInfo)
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['users']),
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: `${variables?.candidateEmail} has been made an admin.`,
                    showConfirmButton: true
                });
        },
        onError: () => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to directly update role by admin.',
                showConfirmButton: true
            });
        }
    })
    const handleRoleChange = (candidateEmail, role) => {
        const updateInfo = {
            role,
            assigned_admin_name: adminName,
            assigned_admin_email: adminEmail,
            assigned_at: new Date().toISOString()
        }
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'You  want to make this user Admin',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, make Admin'
        }).then((result) => {
            if (result?.isConfirmed) {
                changeRoleMutation.mutate({ candidateEmail, updateInfo })
            }
        })
    }
    const handleCharityRoleChange = (candidateEmail, role) => {
        const updateInfo = {
            role,
            assigned_admin_name: adminName,
            transection_id: 'not_applicable',
            assigned_admin_email: adminEmail,
            assigned_at: new Date().toISOString()
        }
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'You  want to make this user Admin',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, make Admin'
        }).then((result) => {
            if (result?.isConfirmed) {
                changeRoleMutation.mutate({ candidateEmail, updateInfo })
            }
        })
    }
    if (isPending) {
        return <Loading />
    }
    return (
        <>
            <section className='my-5'>
                <h2 className='text-2xl font-semibold text-gray-950 text-center'>All the users listed here</h2>
            </section>
            <section className='overflow-x-auto'>
                <table className='table table-zebra w-full'>
                    <thead className='bg-gray-200'>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th className='text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((u, index) => (
                                <tr key={u?._id}>
                                    <td>{index + 1}</td>
                                    <td>{u?.name}</td>
                                    <td>{u?.email}</td>
                                    <td className='capitalize'>{u?.role || 'user'}</td>
                                    <td className='flex gap-2 '>
                                        <button
                                            onClick={() => handleRoleChange({ candidateEmail: u?.email, role: 'admin' })}
                                            className='btn whitespace-nowrap bg-teal-700 text-gray-200 hover:bg-teal-800'
                                            disabled={changeRoleMutation?.isPending || ['admin', 'restaurant', 'charity'].includes(u?.role)}
                                        >
                                            Make Admin
                                        </button>
                                        <button
                                            onClick={() => handleRoleChange({ candidateEmail: u?.email, role: 'restaurant' })}
                                            className='btn whitespace-nowrap bg-green-700 text-gray-200 hover:bg-green-800'
                                            disabled={changeRoleMutation?.isPending || ['admin', 'restaurant', 'charity'].includes(u?.role)}
                                        >
                                            Make Restaurant
                                        </button>
                                        <button
                                            onClick={() => handleCharityRoleChange({ candidateEmail: u?.email, role: 'charity' })}
                                            className='btn whitespace-nowrap bg-yellow-700 text-gray-200 hover:bg-yellow-800'
                                            disabled={changeRoleMutation?.isPending || ['admin', 'restaurant', 'charity'].includes(u?.role)}
                                        >
                                            Make Charity
                                        </button>
                                        <button className='btn whitespace-nowrap bg-red-700 text-gray-200 hover:bg-red-800'>Delete User</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default ManageUsers;