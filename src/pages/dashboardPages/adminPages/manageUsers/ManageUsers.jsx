import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Loading from '../../../../components/loadingComponents/Loading';
import { Swal } from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';

const ManageUsers = () => {
    const {user}=useAuth();
    const adminEmail=user?.email
    const axiosSecure = useAxiosSecure()
    const { data: users = [], isPending } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/all');
            return res?.data
        }
    });
    // console.log(users)
    const makeAdminMutation=useMutation({
        mutationFn: async(candidateEmail)=>{
            const res=await axiosSecure.patch(`user/direct_role_change/${adminEmail}/${candidateEmail}`)
        },
        onSuccess:
        onError:
    })
    const handleMakeAdmin = (candidateEmail) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'You  want to make this user Admin',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText:'Yes, make Admin'
        }).then((result)=>{
            if(result?.isConfirmed){
                makeAdminMutation.mutate(candidateEmail)
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
                                            onClick={()=>handleMakeAdmin({candidateEmail: u?.email})}
                                            className='btn whitespace-nowrap bg-teal-700 text-gray-200 hover:bg-teal-800'
                                            disabled={u?.role='admin'}>
                                            Make Admin
                                        </button>
                                        <button className='btn whitespace-nowrap bg-green-700 text-gray-200 hover:bg-green-800'>Make Restaurant</button>
                                        <button className='btn whitespace-nowrap bg-yellow-700 text-gray-200 hover:bg-yellow-800'>Make Charity</button>
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