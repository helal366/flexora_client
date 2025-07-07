import React from 'react';
import Lottie from 'lottie-react';
import register from './signUpTwo.json'

const SignUp = () => {
    return (
       <div className='w-120 h-120'>
            <Lottie animationData={register} loop={true}></Lottie>
        </div>
    );
};

export default SignUp;