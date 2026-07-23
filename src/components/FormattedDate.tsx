import React from 'react';

// 1. Define the interface for your component props
interface FormattedDateProps {
    dateString: string | null | undefined; // Handles dynamic backend dates safely
}
const FormattedDate = ({dateString}:FormattedDateProps) => {
    if(!dateString){
        return null
    }
    const date=new Date(dateString);

    // 2. Check for invalid dates to avoid rendering "Invalid Date"
    if (isNaN(date.getTime())) {
         return null;
    }
    const formattedDate=date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    })
    return <>{formattedDate}</>; // Wrapped in fragment for correct React node rendering
};

export default FormattedDate;