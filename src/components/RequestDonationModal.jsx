import React from 'react';

const RequestDonationModal = ({
  donation,
  user,
  requestRegister,
  handleRequestSubmit,
  submitRequest,
  setShowRequestModal,
}) => {
  return (
    <dialog className="modal modal-open">
      <section className="modal-box">
        <h3 className="font-bold text-lg mb-2">Request Donation</h3>
        <form onSubmit={handleRequestSubmit(submitRequest)} className="space-y-3">
          {/* Donation Image */}
          <div className="form-control">
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
              defaultValue={user?.displayName}
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
              defaultValue={user?.email}
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
