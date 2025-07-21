import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const RequestDonationModalHome = ({ modalRef, donation, user }) => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const requestData = {
      donation_id: donation._id,
      donation_title: donation.title,
      donation_image: donation.image,
      restaurant_name: donation.restaurant_name,
      restaurant_email: donation.restaurant_email,
      restaurant_representative_name: donation.restaurant_representative_name,
      restaurant_representative_email: donation.restaurant_representative_email,
      charity_representative_name: user.displayName,
      charity_representative_email: user.email,
      charity_name: user.organization_name || '', // adjust if you keep org name here
      charity_email: user.email,
      request_description: data.request_description,
      preferred_pickup_time: data.pickup_time,
      preferred_pickup_date: data.pickup_date,
      request_status: 'Pending',
      created_at: new Date(),
    };

    try {
      await axiosSecure.post('/donation-requests', requestData);
      Swal.fire('Success', 'Donation request submitted!', 'success');
      reset();
      modalRef.current?.close();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.response?.data?.message || error.message || 'Failed to submit request.',
      });
    }
  };

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => modalRef.current?.close()}
        initialFocus={modalRef}
      >
        <div className="fixed inset-0 bg-black bg-opacity-30" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                Request Donation
              </Dialog.Title>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Readonly fields */}
                <div>
                  <label className="font-semibold">Donation Title</label>
                  <input
                    type="text"
                    value={donation.title}
                    readOnly
                    className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="font-semibold">Restaurant Name</label>
                  <input
                    type="text"
                    value={donation.restaurant_name}
                    readOnly
                    className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="font-semibold">Charity Representative Name</label>
                  <input
                    type="text"
                    value={user.displayName}
                    readOnly
                    className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="font-semibold">Charity Representative Email</label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                  />
                </div>

                {/* Editable fields */}
                <div>
                  <label className="font-semibold">Request Description</label>
                  <textarea
                    {...register('request_description', { required: true })}
                    className="textarea textarea-bordered w-full"
                    placeholder="Describe your request"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="font-semibold">Preferred Pickup Date</label>
                  <input
                    type="date"
                    {...register('pickup_date', { required: true })}
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="font-semibold">Preferred Pickup Time</label>
                  <input
                    type="time"
                    {...register('pickup_time', { required: true })}
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="modal-action flex justify-end gap-2">
                  <button
                    type="submit"
                    className="btn btn-success"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={() => modalRef.current?.close()}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RequestDonationModalHome;
