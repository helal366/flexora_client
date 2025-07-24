import React from 'react';

const ButtonOne = ({children, bg, hoverBg, textColor, onClick, disabled, isFavorited}) => {
    return (
        <button 
        onClick={onClick}
        disabled={disabled}
        className={`btn ${bg} ${hoverBg} ${textColor} mb-6 ${isFavorited?'text-gray-600/50 cursor-not-allowed':''}`}>
            {children}
        </button>
    );
};

export default ButtonOne;