import React from 'react';


export function convertDate(dateString) {
    const dateArray = dateString.split('-');
    const newDate = `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
    return newDate;
}

export default function utility() {
    return (
        <div>
            
        </div>
    )
}
