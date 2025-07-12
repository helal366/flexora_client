import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import slideOne from '../../assets/bannerOne.png'
import slideTwo from '../../assets/bannerTwo.png'
import slideThree from '../../assets/bannerThree.png'

const Slider = () => {
    return (
        <Carousel autoPlay={true} infiniteLoop={true} interval={1500} showThumbs={false}>
            <div className='border border-gray-400/50 rounded'>
                <img className='roounded' src={slideOne} alt="slide one" />
                <p></p>
            </div>
            <div className='border border-gray-400/50 rounded'>
                <img className='roounded' src={slideTwo} alt="slide two" />
                <p></p>
            </div>
            <div className='border border-gray-400/50 rounded'>
                <img className='roounded' src={slideThree} alt="slide three" />
                <p></p>
            </div>
        </Carousel>
    );
};

export default Slider;