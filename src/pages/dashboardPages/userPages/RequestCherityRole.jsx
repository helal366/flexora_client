import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';

const RequestCherityRole = () => {
    const {user}= useAuth();
    const {register, formState: {errors} }=useForm()
    return (
        <section className='max-w-2xl mx-auto my-8 bg-white p-6 rounded shadow-lg shadow-gray-600'>
            <h2 className='font-semibold text-2xl text-center mb-4'>
                Request charity role
            </h2>
            <form className='space-y-4'>
                {/* name */}
                <div>
                    <label className='label text-teal-900 font-medium'>Name</label>
                    <input type='text' 
                    value={user?.displayName} 
                    readOnly 
                    className='input w-full'/>
                </div>
                {/* email */}
                <div>
                    <label className='label text-teal-900 font-medium'>Email</label>
                    <input type='email' 
                    value={user?.email} 
                    readOnly 
                    className='input w-full'/>
                </div>
                {/* organization name */}
                <div>
                    <label className='label text-teal-900 font-medium'>Organization Name</label>
                    <input type='text'
                    className='input w-full'
                    placeholder='Organization Name'
                    {...register('organization_name', {required: 'Organization name is required.'})}
                    />
                    {errors?.organization_name && <p className='text-xs text-red-500'>{errors.organization_name?.message}</p>}
                </div>
                {/* mission statement */}
                <div>
                    <label className='label text-teal-900 font-medium'>Mission Statement</label>
                    <textarea 
                    rows={4}
                    className='textarea w-full'
                    placeholder='Describe your mission'
                    {...register('mission', {required: 'Mission statement is required'})}
                    />
                    {errors?.mission && <p className='text-xs text-red-500'>{errors.mission?.message} </p>}
                </div>
                {/* payment  */}
                <div>
                    <p className='text-lg font-medium'>Payment amount: 
                        <span className='text-green-800 font-semibold ml-2'>
                            $50
                        </span>
                    </p>
                    <label htmlFor="payment_modal" className='btn mt-3 bg-teal-100 w-full'>Pay $50</label>
                </div>
                {/* payment modal */}
                <div className='modal' role='dialog'>
                    <div className='modal-box text-center'>
                        
                    </div>
                </div>
            </form>
        </section>
    );
};

export default RequestCherityRole;