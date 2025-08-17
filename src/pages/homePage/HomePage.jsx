import React, { useEffect } from 'react';
import Slider from './Slider';
import FeaturedDonations from './FeaturedDonations';
import HomeCharityRequests from './HomeCharityRequests';
import TopCharityRequests from './TopCharityRequests';
import TopDonatedRestaurant from './TopDonatedRestaurant';

const HomePage = () => {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <section className='py-10'>
            <section className='mb-10'>
                <Slider/>
            </section>
            <section className='mb-10'>
                <FeaturedDonations/>
            </section>
            <section className='mb-10'>
                <HomeCharityRequests/>
            </section>
            <section className='mb-10'>
                <TopCharityRequests/>
            </section>
            <section className='mb-10'>
                <TopDonatedRestaurant/>
            </section>
        </section>
    );
};

export default HomePage;