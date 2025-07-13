import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Loading from '../../../../components/loadingComponents/Loading';

const ManageUsers = () => {
    const axiosSecure=useAxiosSecure()
    const {data: users=[], isPending}=useQuery({
        queryKey: ['users'],
        queryFn: async()=>{
            const res= await axiosSecure.get('/users/all');
            return res?.data
        }
    });
    console.log(users)
    if(isPending){
        return <Loading/>
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
                    users.map((user, index)=>(
                        <tr key={user?._id}>
                            <td>{index+1}</td>
                            <td>{user?.name}</td>
                            <td>{user?.email}</td>
                            <td className='capitalize'>{user?.role || 'user'}</td>
                            <td className='flex gap-2 '>
                                <button 
                                onClick={handleMakeAdmin}
                                className='btn whitespace-nowrap bg-teal-700 text-gray-200 hover:bg-teal-800'>
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