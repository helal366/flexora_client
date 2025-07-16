import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useUserRole from '../../../../hooks/useUserRole';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useCloudinaryImageUpload from '../../../../hooks/useCloudinaryImageUpload';
import Loading from '../../../../components/loadingComponents/Loading';

const RestaurantProfileUpdate = () => {
  const { userInfo, roleLoading } = useUserRole();
  const axiosSecure = useAxiosSecure();
  const { mutateAsync: uploadImage, isPending, isError, error } = useCloudinaryImageUpload();

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
      role: user?.role || '',
      contact_number: user?.contact_number || '',
      organization_tagline: user?.organization_tagline || '',
      mission: user?.mission || '',
      organization_contact: user?.organization_contact || '',
      organization_email: user?.organization_email || '',
      organization_name: user?.organization_name || '',
      status: user?.status || 'Pending',
      organization_address: user?.organization_address || '',
    }, 
    mode: 'onChange'
  });

  // Reset form when data becomes available
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
        contact_number: user.contact_number || '',
        organization_tagline: user?.organization_tagline || '',
        mission: user.mission || '',
        organization_contact: user.organization_contact || '',
        organization_email: user.organization_email || '',
        organization_name: user.organization_name || '',
        status: user.status || 'Pending',
        organization_address: user.organization_address || '',
      });
    }
  }, [user, reset]);

  // Submit handler
  const onSubmit = async (formData) => {
    const updatedData = { ...formData }
    try {
      // ORGANIZATION LOGO
      const orgFile = formData?.organization_logo?.[0];
      if (orgFile) {
        const uploadedOrgLogo = await uploadImage(orgFile);
        updatedData.organization_logo = uploadedOrgLogo
      } else {
        updatedData.organization_logo = user.organization_logo || '';
      }

      // PERSONAL PHOTO
      const photoFile = formData?.photoURL?.[0];
      if (photoFile) {
        const uploadedPhotoFile = await uploadImage(photoFile);
        updatedData.photoURL = uploadedPhotoFile
      } else {
        updatedData.photoURL = user.photoURL || '';
      }

      const res = await axiosSecure.patch(`/users/update-restaurant-profile/${user?.email}`, updatedData);
      if (res?.data?.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          text: 'Profile updated successfully!',
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: 'info',
          text: 'No changes were made to your profile.',
          timer: 1500,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error', title: 'Update failed!', text: err?.message, timer: 2500, showConfirmButton: true
      })
    }
  };

  if (roleLoading) return <Loading />;


  return (
    <>
      {isError && (
        <div className="mb-4 text-red-600 bg-red-100 p-2 rounded">
          Failed to upload image: {error?.message || 'Unknown error'}
        </div>
      )}

      <section className='mb-20'>
        <p className='text-center my-5 text-xl font-semibold italic bg-teal-400 text-gray-700'>Restaurant Profile Update Form</p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto p-4 bg-white rounded shadow">
          {/* Name */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              readOnly
              {...register('name', { required: 'Your name is required' })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              readOnly
              {...register('email', { required: 'Your email is required' })}
              className="input input-bordered w-full"
            />
          </div>

          {/* upload your photo if you need to update */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Upload Your Profile Photo to update</label>
            {user?.photoURL && (
              <img src={user.photoURL} alt="Current" className="w-16 h-16 rounded-full mb-2" />
            )}
            <input
              type="file" accept="image/*"
              {...register('photoURL')}
              placeholder='Upload your photo'
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
              {...register('contact_number', { required: 'Your contact number is required' })}
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
              {...register('organization_contact', { required: 'Organization contact is required' })}
              className="input input-bordered w-full"
            />
            {errors.organization_contact && (
              <p className="text-red-600">{errors.organization_contact.message}</p>
            )}
          </div>

          {/* Organization Address */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Organization Address</label>
            <textarea
              {...register('organization_address', { required: 'Organization address is required' })}
              className="textarea textarea-bordered w-full"
              rows={2}
            />
            {errors.organization_address && (
              <p className="text-red-600">{errors.organization_address.message}</p>
            )}
          </div>

          {/*Upload Organization Logo if you need to update*/}
          <div className="mb-4">
            <label className="block font-medium mb-1">Upload Organization Logo to update </label>
            {user?.organization_logo && (
              <img src={user.organization_logo} alt="Current" className="w-16 h-16 rounded-full mb-2" />
            )}
            <input
              type="file" accept="image/*"
              {...register('organization_logo')}
              className="input input-bordered w-full"
            />
            {errors.organization_logo && (
              <p className="text-red-600">{errors.organization_logo.message}</p>
            )}
          </div>

          {/* Tagline */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Organization Tagline</label>
            <input
              {...register('organization_tagline', { required: 'Organization tagline is required' })}
              className="input input-bordered w-full"
            />
            {errors.organization_tagline && (
              <p className="text-red-600">{errors.organization_tagline.message}</p>
            )}
          </div>
          {/* Mission */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Mission</label>
            <textarea
              {...register('mission', { required: 'Organization mission statement is required' })}
              className="textarea textarea-bordered w-full"
              rows={2}
            />
            {errors.mission && (
              <p className="text-red-600">{errors.mission.message}</p>
            )}
          </div>

          {/* Status */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Status</label>
            <input
              type='text'
              {...register('status')}
              disabled
              className="input input-bordered w-full" />

          </div>
          {isPending && <p className="text-yellow-500 font-medium my-2">Uploading image, please wait...</p>}

          <button
            type="submit"
            disabled={isSubmitting || isPending}
            className="btn bg-teal-700 text-gray-300 hover:bg-teal-900 w-full"
          >
            {isSubmitting || isPending ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </section>
    </>
  );
};

export default RestaurantProfileUpdate;
