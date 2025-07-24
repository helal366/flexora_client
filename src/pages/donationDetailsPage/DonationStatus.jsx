import React from 'react';

const DonationStatus = ({ status }) => {
    const statusColor = () => {
        switch (status) {
            case 'Available':
                return 'bg-purple-200';
            case 'Requested':
                return 'bg-yellow-200';
            case 'Picked Up':
                return 'bg-green-300';
            default:
                return 'bg-gray-300'

        }
    }
    return (
        <div className='my-4'>
            <span className='font-semibold italic text-teal-800'>Donation status : </span>
            <span className={`${statusColor()} rounded px-3 py-1 text-gray-900 font-semibold shadow-lg`}>
                {status}
            </span>
        </div>
    );
};

export default DonationStatus;