import React from 'react';
import SingleUI from './SingleUI';
import DonationStatus from './DonationStatus';

const DonationUI = ({donation, formattedDate, totalFood, status}) => {
    return (
        <section className='space-y-1 '>
                <SingleUI label='Food Type' value={donation?.food_type}/>
                <SingleUI label='Restaurant Name' value={donation?.restaurant_name}/>
                <SingleUI label='Restaurant Email' value={donation?.restaurant_email}/>
                <SingleUI label='Restaurant Representative Name' value={donation?.restaurant_representative_name}/>
                <SingleUI label='Restaurant Representative Email' value={donation?.restaurant_representative_email}/>
                <SingleUI label='Restaurant Location' value={donation?.location}/>
                <SingleUI label='Total Food' value={totalFood} />
                <SingleUI label='Proposed Pickup Date' value={formattedDate} />
                <SingleUI label='Proposed Pickup Time' value={donation?.pickup_time_window} />
                <DonationStatus status={status}/>
           </section>
    );
};

export default DonationUI;