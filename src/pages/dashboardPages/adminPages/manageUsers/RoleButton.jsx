import React from 'react';

const RoleButton = ({ userRole,  label, bgColor, isLoading, hoverColor, onClick }) => {
    const isDisabled = isLoading || ['admin', 'restaurant', 'charity'].includes(userRole)
    const baseStyles = 'btn whitespace-nowrap'
    const activeStyles = `${bgColor} text-gray-200 ${hoverColor}`
    const disabledStyles = `bg-gray-300 text-black/40 cursor-not-allowed`
    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${isDisabled ? disabledStyles: activeStyles}`}
            disabled={isDisabled}
        >
            {label}
        </button>
    );
};

export default RoleButton;