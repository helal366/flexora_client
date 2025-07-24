import React from 'react';

const SingleUI = ({label, value}) => {
    if(!value){
        return null
    }
    return (
        <p className='text-teal-800 text-[15px]'>
           <span className='font-semibold italic'>{label} : </span> {value}
        </p>
    );
};

export default SingleUI;