import React from 'react';

const FormattedDate = ({dateString}) => {
    if(!dateString){
        return null
    }
    const date=new Date(dateString)
    const formattedDate=date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    })
    return formattedDate
};

export default FormattedDate;