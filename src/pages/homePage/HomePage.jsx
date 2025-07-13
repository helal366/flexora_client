import React, { useEffect } from 'react';
import Slider from './Slider';

const HomePage = () => {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <section className='py-10'>
            <section className='mb-10'>
                <Slider/>
            </section>
        </section>
    );
};

export default HomePage;