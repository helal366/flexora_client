import React from 'react';
import Loading from '../../components/loadingComponents/Loading';

const CardCharityRequest = ({ request }) => {

    return (
        <section className='card bg-gray-200 shadow-xl'>
            <figure>
                <img
                    className='max-h-40 w-full'
                    src={request?.charity_logo}
                    alt={request?.charity_name} />
            </figure>
            <div className='card-body'>
                <h2 className="card-title mb-6 two"> {request?.charity_name} </h2>
                
                    <img
                        src={request?.donation_image}
                        alt={request?.donation_title || "Donated food"}
                        className="w-14 h-14 object-cover border-2 border-gray-400 rounded-md"
                    />
                <p> <span className='two'>Food Donation Title :</span> <span className='text-black'>{request?.donation_title}</span></p>
                <p> <span className='two'>Charity Representative :</span> <span className='text-black'>{request?.charity_representative_name}</span></p>
            </div>
        </section>
    );
};

export default CardCharityRequest;