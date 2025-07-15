import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useUserRole from '../../../../hooks/useUserRole';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import  Swal  from 'sweetalert2';

const CharityProfileUpdate = () => {
  const { userInfo, roleLoading } = useUserRole();
  const axiosSecure = useAxiosSecure();

  // Extract user data from role info
  const user = userInfo?.user_by_email;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      photoURL: user?.photoURL || '',
      role: user?.role || '',
      contact_number: user?.contact_number || '',
      mission: user?.mission || '',
      organization_contact: user?.organization_contact || '',
      organization_email: user?.organization_email || '',
      organization_name: user?.organization_name || '',
      transection_id: user?.transection_id || '',
      status: user?.status || 'Pending',
      organization_logo: user?.organization_logo || '',
      organization_address: user?.organization_address || '',
    }
  });

  // Reset form when data becomes available
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
        role: user.role || '',
        contact_number: user.contact_number || '',
        mission: user.mission || '',
        organization_contact: user.organization_contact || '',
        organization_email: user.organization_email || '',
        organization_name: user.organization_name || '',
        transection_id: user.transection_id || '',
        status: user.status || 'Pending',
        organization_logo: user.organization_logo || '',
        organization_address: user.organization_address || '',
      });
    }
  }, [user, reset]);

  // Submit handler
  const onSubmit = async (formData) => {
    try {
      const res = await axiosSecure.patch(`/users/update-charity-profile/${user?.email}`, formData);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          text: 'Profile updated successfully!',
          timer: 1500
        })

      } else {
        Swal.fire({
          text: 'Profile updated successfully!',
          timer: 1500
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: `Failed to update profile.! ${error}`,
        timer: 1500
      })
    }
  };

  if (roleLoading) return <Loading />;


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto p-4 bg-white rounded shadow">
      {/* Name */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Name</label>
        <input
          type="text"
          {...register('name')}
          className="input input-bordered w-full"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          {...register('email')}
          className="input input-bordered w-full"
        />
      </div>

      {/* Photo URL */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Photo URL</label>
        <input
          type="url"
          {...register('photoURL')}
          className="input input-bordered w-full"
        />
      </div>

      {/* Role */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Role</label>
        <input
          type="text"
          {...register('role')}
          className="input input-bordered w-full"
          disabled
        />
      </div>

      {/* Contact Number */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Contact Number</label>
        <input
          type="text"
          {...register('contact_number')}
          className="input input-bordered w-full"
        />
      </div>

       {/* Organization Name */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Organization Name</label>
        <input
          type="text"
          {...register('organization_name', { required: 'Organization name is required' })}
          className="input input-bordered w-full"
        />
        {errors.organization_name && (
          <p className="text-red-600">{errors.organization_name.message}</p>
        )}
      </div>

      {/* Organization Email */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Organization Email</label>
        <input
          type="email"
          {...register('organization_email', { required: 'Organization email is required' })}
          className="input input-bordered w-full"
        />
        {errors.organization_email && (
          <p className="text-red-600">{errors.organization_email.message}</p>
        )}
      </div>

     {/* Organization Contact */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Organization Contact</label>
        <input
          type="text"
          {...register('organization_contact')}
          className="input input-bordered w-full"
        />
      </div>

        {/* Mission */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Mission</label>
        <textarea
          {...register('mission')}
          className="textarea textarea-bordered w-full"
          rows={4}
        />
      </div>

      {/* Transection ID */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Transaction ID</label>
        <input
          type="text"
          {...register('transection_id')}
          disabled
          className="input input-bordered w-full"
        />
      </div>

      {/* Status */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Status</label>
        <input 
        type='text'
        {...register('status')} 
        disabled
        className="input input-bordered w-full"/>
          
      </div>

      {/* Organization Logo */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Organization Logo URL</label>
        <input
          type="url"
          {...register('organization_logo')}
          className="input input-bordered w-full"
        />
      </div>

      {/* Organization Address */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Organization Address</label>
        <textarea
          {...register('organization_address')}
          className="textarea textarea-bordered w-full"
          rows={2}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary w-full"
      >
        {isSubmitting ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  );
};

export default CharityProfileUpdate;
