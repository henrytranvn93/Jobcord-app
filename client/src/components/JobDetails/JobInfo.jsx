import React from 'react';
import description from '../../assets/images/description.svg';

export default function JobInfo() {
    return (
        <div className="jobInfo">
            <div className="jobInfo__image-container">
                <img src={description} alt="Girl with description" className="jobInfo__hero-image" />
            </div>
            
        </div>
    )
}
