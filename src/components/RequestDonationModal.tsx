import React, { FormEvent } from 'react';
import { User } from 'firebase/auth';
import { FieldValues, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import Swal from 'sweetalert2';

// Defined structural data interfaces for typesafety
interface DonationRequest {
  charity_representative_email?: string | null;
}

interface Donation {
  _id: string;
  image?: string;
  donation_title?: string;
  restaurant_name?: string;
  request?: DonationRequest;
}

// Errors 1 to 6: Defined strict types for component props
interface RequestDonationModalProps {
  donation: Donation;
  user: User | null;
  requestRegister: UseFormRegister<any>; // Supports flexible react-hook-form schemas
  handleRequestSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  submitRequest: (data: any) => void;
  setShowRequestModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const RequestDonationModal = ({
  donation,
  user,
  requestRegister,
  handleRequestSubmit,
  submitRequest,
  setShowRequestModal,
}:RequestDonationModalProps) => {
  
  // Wrap the parent's handleRequestSubmit to add duplicate request check
  // Error 7: Explicitly typed the HTML form submission event
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if user already requested this donation
    if (
      donation.request &&
      donation.request.charity_representative_email === user?.email
    ) {
      Swal.fire('Oops!', 'You have already sent a request for this donation.', 'warning');
      return;
    }

    // Use parent's handler for actual submission
    handleRequestSubmit(submitRequest)(event);
  };

  return (
    <dialog className="modal modal-open">
      <section className="modal-box">
        <h3 className="font-bold text-lg mb-2">Request Donation</h3>
        <form onSubmit={onSubmit} className="space-y-3">
          {/* Donation Image */}
          <div className="form-control">
            <input
              type="hidden"
              {...requestRegister('donation_id')}
              value={donation?._id}
            />

            <label className="label">
              <span className="label-text">Donation Image</span>
            </label>
            <img
              src={donation?.image}
              alt="Donation"
              className="w-full max-h-64 object-cover rounded-lg border"
            />
          </div>

          {/* Donation Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Donation Title</span>
            </label>
            <input
              readOnly
              defaultValue={donation?.donation_title}
              className="input input-bordered w-full"
            />
          </div>

          {/* Restaurant Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Restaurant Name</span>
            </label>
            <input
              readOnly
              defaultValue={donation?.restaurant_name}
              className="input input-bordered w-full"
            />
          </div>

          {/* Charity Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Charity Name</span>
            </label>
            <input
              readOnly
              {...requestRegister('charity_name')}
              defaultValue={user?.displayName || undefined}
              className="input input-bordered w-full"
            />
          </div>

          {/* Charity Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Charity Email</span>
            </label>
            <input
              readOnly
              {...requestRegister('charity_email')}
              defaultValue={user?.email || undefined}
              className="input input-bordered w-full"
            />
          </div>

          {/* Request Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Request Description</span>
            </label>
            <textarea
              {...requestRegister('request_description', { required: true })}
              placeholder="Request details..."
              className="textarea textarea-bordered w-full"
            />
          </div>

          {/* Preferred Pickup Date */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Preferred Pickup Date</span>
            </label>
            <input
              type="date"
              {...requestRegister('pickup_date', { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Preferred Pickup Time */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Preferred Pickup Time</span>
            </label>
            <input
              type="time"
              {...requestRegister('pickup_time', { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" onClick={() => setShowRequestModal(false)} className="btn">Cancel</button>
          </div>
        </form>
      </section>
    </dialog>
  );
};

export default RequestDonationModal;
