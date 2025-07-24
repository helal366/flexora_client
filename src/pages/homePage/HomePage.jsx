import React, { useEffect } from 'react';
import Slider from './Slider';
import FeaturedDonations from './FeaturedDonations';

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
        </section>
    );
};

export default HomePage;