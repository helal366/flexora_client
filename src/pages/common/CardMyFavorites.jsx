import React from 'react';
import { Link } from 'react-router'

const CardMyFavorites = ({ favorite }) => {
    const donationId=favorite?.donationId;
    console.log({donationId});

    const handleDelete=()=>{
        alert('clicked')
    }
    return (
        <section className='card bg-gray-200 shadow-xl'>
            {/* image */}
            <figure>
                <img
                    className='max-h-60 w-full'
                    src={favorite?.image}
                    alt={favorite?.donation_title} />
            </figure>
            {/* body */}
            <div className='card-body'>
                <h2 className="card-title"> {favorite?.donation_title} </h2>
                <p> <span className='two'>Restaurant Name :</span> {favorite?.restaurant_name}</p>
                <p> <span className='two'>Restaurant Location :</span> {favorite?.location}</p>
                <p> <span className='two'>Donation Status :</span> {favorite?.donation_status}</p>
                <p> <span className='two'>Quantity :</span> {favorite?.quantity} {favorite?.unit}{favorite?.quantity > 0 ? 's' : ''}</p>
            </div>
            {/* button */}
            <div className='mx-6 mb-8 flex flex-wrap gap-5 justify-between'>
                <Link to={`/donations/${donationId}`}>
                    <button className='fourButton'>
                        Details
                    </button>
                </Link>

                <button 
                onClick={handleDelete}
                className='btn bg-red-500 hover:bg-red-800 text-gray-50'>
                    Delete
                </button>
            </div>
        </section>
    );
};

export default CardMyFavorites;