import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Loading from '../../../../components/loadingComponents/Loading';
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';
import queryClient from '../../../../api/queryClient';
import RoleButton from './RoleButton';

const ManageUsers = () => {
    const { user } = useAuth();
    const adminEmail = user?.email;
    const adminName = user?.displayName;
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
            const res = await axiosSecure.patch(`user/direct_role_change/${adminEmail}/${candidateEmail}`, updateInfo)
            return res
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['users']),
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: `${variables?.candidateEmail} has been updated as ${variables.role}.`,
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
    const deleteUserMutation = useMutation({
        mutationFn: async ({ id }) => {
            return axiosSecure.delete(`/users/${id}`)
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['users'])
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: `${variables?.email} has been deleted!`,
                showConfirmButton: true,
            })
        },
        onError: (error) => {
            console.log('delete user error', error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete user.',
                showConfirmButton: true
            });
        }
    })
    const confirmRoleChange = (candidateEmail, role, updateInfo) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: `You  want to make this user ${role}`,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, make ${role}`
        }).then((result) => {
            if (result?.isConfirmed) {
                changeRoleMutation.mutate({ candidateEmail, role, updateInfo })
            }
        })
    }
    const handleRoleChange = ({ candidateEmail, role }) => {
        const updateInfo = {
            role: role,
            status: 'Approved',
            assigned_admin_name: adminName,
            assigned_admin_email: adminEmail,
            assigned_at: new Date().toISOString()
        }
        confirmRoleChange(candidateEmail, role, updateInfo)

    }
    const handleCharityRoleChange = ({ candidateEmail, role }) => {
        const updateInfo = {
            role,
            assigned_admin_name: adminName,
            transection_id: 'not_applicable',
            amount_paid: 'not_applicable',
            currency: 'not_applicable',
            charity_request_time: 'not_applicable',
            status: 'Approved',
            assigned_admin_email: adminEmail,
            assigned_at: new Date().toISOString()
        }
        confirmRoleChange(candidateEmail, role, updateInfo)

    }
    const handleDeleteUser = ({ id, name, email }) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `This will permanently delete ${name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        }).then((result) => {
            if (result?.isConfirmed) {
                deleteUserMutation.mutate({ id, email });
            }
        })
    }
    if (isPending) {
        return <Loading />
    }
    return (
        <>
            <section className='my-5 px-4'>
                <h2 className='text-2xl font-semibold text-gray-950 text-center'>Total users: {users.length || 0} </h2>
            </section>
            <section className='overflow-x-auto p-4'>
                <table className='table table-zebra min-w-full'>
                    <thead className='bg-gray-600 text-gray-100'>
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

                                        <RoleButton
                                            userRole={u?.role}
                                            label='Make Admin'
                                            bgColor='bg-teal-700'
                                            hoverColor='hover:bg-teal-900'
                                            isLoading={changeRoleMutation?.isPending}
                                            onClick={() => handleRoleChange({ candidateEmail: u?.email, role: 'admin' })}
                                        />

                                        <RoleButton
                                            userRole={u?.role}
                                            label='Make Restaurant'
                                            bgColor='bg-green-700'
                                            hoverColor='hover:bg-green-900'
                                            isLoading={changeRoleMutation?.isPending}
                                            onClick={() => handleRoleChange({ candidateEmail: u?.email, role: 'restaurant' })}
                                        />

                                        <RoleButton
                                            userRole={u?.role}
                                            label='Make Charity'
                                            bgColor='bg-yellow-700'
                                            hoverColor='hover:bg-yellow-900'
                                            isLoading={changeRoleMutation?.isPending}
                                            onClick={() => handleCharityRoleChange({ candidateEmail: u?.email, role: 'charity' })}
                                        />
                                        <button
                                            onClick={() => handleDeleteUser({ id: u?._id, name: u?.name, email: u?.email })}
                                            disabled={deleteUserMutation.isPending}
                                            className='btn whitespace-nowrap bg-red-700 text-gray-200 hover:bg-red-800'>
                                            Delete User
                                        </button>
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