import React from 'react';

const ButtonOne = ({children, bg, hoverBg, textColor, onClick, disabled}) => {
    return (
        <button 
        onClick={onClick}
        disabled={disabled}
        className={`btn ${bg} ${hoverBg} ${textColor} mb-6`}>
            {children}
        </button>
    );
};

export default ButtonOne;