import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import slideOne from '../../assets/bannerOne.png'
import slideTwo from '../../assets/bannerTwo.png'
import slideThree from '../../assets/bannerThree.png'

const Slider = () => {
    return (
        <Carousel autoPlay={true} infiniteLoop={true}>
            <div className='border border-gray-400/50 rounded'>
                <img src={slideOne} alt="slide one" />
                <p></p>
            </div>
            <div className='border border-gray-400/50 rounded'>
                <img src={slideTwo} alt="slide two" />
                <p></p>
            </div>
            <div className='border border-gray-400/50 rounded'>
                <img src={slideThree} alt="slide three" />
                <p></p>
            </div>
        </Carousel>
    );
};

export default Slider;