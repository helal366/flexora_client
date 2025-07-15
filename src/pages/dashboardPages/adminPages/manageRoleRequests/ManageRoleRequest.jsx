import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import Loading from '../../../../components/loadingComponents/Loading';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';
import queryClient from '../../../../api/queryClient';

const ManageRoleRequest = () => {
    const {user}=useAuth();
    const adminEmail=user?.email
    const axiosSecure=useAxiosSecure();
    const {data: role_requests=[], isPending}=useQuery({
        queryKey: ['roleRequests'],
        queryFn: async()=>{
            const res=await axiosSecure.get('/users/role_requests');
            return res?.data;
        }
    })
    
    const updateStatusMutation=useMutation({
        mutationFn: async({candidateEmail, status, role})=>{
            const res=await axiosSecure.patch(`/users/role_request_update/${candidateEmail}/${adminEmail}`, 
                {
                status, 
                role, 
                assigned_admin_name: user?.displayName, 
                assigned_admin_email: adminEmail, 
                assigned_at:new Date().toISOString()
            });
            return res?.data
        },
        onSuccess: (_,variables)=>{
            queryClient.invalidateQueries('roleRequests')
            const action=variables.status;
            if(action==='Approved'){
                Swal.fire({
                    icon: 'success',
                    title: 'Approved!',
                    text: 'Role update request approved.',
                    showConfirmButton: true,
                    timer: 2000
                })
            }else if(action==='Rejected'){
                Swal.fire({
                    icon: 'error',
                    title: 'Rejected!',
                    text: 'Role update request rejected.',
                    showConfirmButton: true,
                    timer: 2000
                })
            }
        },
        onError: ()=>{
            Swal.fire({
                icon: 'error',
                text: 'Something went wrong!',
                timer: 2000,
                showConfirmButton: true
            })
        }
    })
    const handleAction=(candidate, status)=>{
        const candidateEmail=candidate?.email;
        const candidateRole=candidate?.role;
        let updatedRole=candidateRole
        if(status==='Approved'){
           updatedRole=candidateRole==='charity_role_request'?'charity':'restaurant';
        }else if(status==='Rejected'){
            updatedRole='user'
        }
        updateStatusMutation.mutate({candidateEmail, status, role:updatedRole})
    }
    if(isPending){
        return <Loading/>
    }
    return (
        <>
        <section className='my-5 px-4'>
            <h2 className='text-2xl font-semibold text-gray-950 text-center'>Total role requests: </h2>
        </section>
        <section className='overflow-auto p-4'>
            <table className='table table-zebra min-w-full'>
                <thead className='bg-gray-700 text-gray-100'>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Organization Name</th>
                        <th className='min-w-[250px]'>Mission</th>
                        <th>Transection ID</th>
                        <th>Status</th>
                        <th className='text-center'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        role_requests.map((request, index)=>(
                            <>
                            <tr key={request._id}>
                                <td>{index+1}</td>
                                <td>{request?.name}</td>
                                <td>{request?.email}</td>
                                <td>{request?.organization_name}</td>
                                <td className='whitespace-normal break-words min-w-[250px]'>{request?.mission}</td>
                                <td>{request?.transection_id}</td>
                                <td>{request?.status}</td>
                                <td className='flex gap-3 justify-center'>
                                    <button onClick={()=>handleAction(request, 'Approved')}
                                    className='btn whitespace-nowrap text-gray-100 bg-green-700 hover:bg-green-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                                    disabled={request?.status!=='Pending'}
                                    >
                                        Approved
                                    </button>
                                    <button onClick={()=>handleAction(request, 'Rejected')}
                                    className='btn whitespace-nowrap text-gray-100 bg-red-700 hover:bg-red-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                                    disabled={request?.status!=='Pending'}
                                    >
                                        Reject
                                    </button>
                                </td>

                            </tr>
                            </>
                        ))
                    }
                </tbody>
            </table>
        </section>
        </>
    );
};

export default ManageRoleRequest;