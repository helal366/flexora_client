import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';

const RequestRestaurantRole = () => {
    const {user}=useAuth();
    const userName=user?.displayName;
    const userEmail=user?.email
    const {register, formState: {errors}}=useForm()
    return (
        <section className='max-w-4xl mx-auto my-8 bg-white p-6 rounded shadow-lg shadow-gray-600'>
            <h2 className='font-semibold text-2xl text-center mb-4'>
                Request restaurant role
            </h2>
            <form className='space-y-4'>
                {/* user name */}
                <div>
                    <label className='label text-teal-900 font-medium'>Name</label>
                    <input type="text" value={userName} readOnly className='input w-full'/>
                </div>
                {/* user email */}
                <div>
                    <label className='label text-teal-900 font-medium'>Email</label>
                    <input type="text" value={userEmail} readOnly className='input w-full'/>
                </div>
                {/* restaurant name */}
                <div>
                    <label className='label text-teal-900 font-medium'>Restaurant Name</label>
                    <input type="text"  className='input w-full'
                    placeholder='Restaurant name'
                    {...register('restaurant_name', {required: 'Restaurant name is required.'})}
                    />
                    {errors?.restaurant_name && <p className='text-xs text-red-500'>{errors.restaurant_name?.message}</p>}
                </div>
                {/* restaurant email */}
                <div>
                    <label className='label text-teal-900 font-medium'>Restaurant Email</label>
                    <input type="text"  className='input w-full'
                    placeholder='Restaurant email'
                    {...register('restaurant_email', {required: 'Restaurant email is required.'})}
                    />
                    {errors?.restaurant_email && <p className='text-xs text-red-500'>{errors.restaurant_email?.message}</p>}
                </div>
                {/* restaurant location */}
                <div>
                    <label className='label text-teal-900 font-medium'>Restaurant Location</label>
                    <input type="text"  className='input w-full'
                    placeholder='Restaurant location'
                    {...register('restaurant_location', {required: 'Restaurant location is required.'})}
                    />
                    {errors?.restaurant_location && <p className='text-xs text-red-500'>{errors.restaurant_location?.message}</p>}
                </div>
                {/* restaurant contact number */}
                <div>
                    <label className='label text-teal-900 font-medium'>Restaurant Contact Number</label>
                    <input type="tel"  className='input w-full'
                    placeholder='Restaurant contact number'
                    {...register('restaurant_contact', {required: 'Restaurant contact number is required.'})}
                    />
                    {errors?.restaurant_contact && <p className='text-xs text-red-500'>{errors.restaurant_contact?.message}</p>}
                </div>
            </form>
        </section>
    );
};

export default RequestRestaurantRole;