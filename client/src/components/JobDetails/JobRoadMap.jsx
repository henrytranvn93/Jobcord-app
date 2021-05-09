import React from 'react';
import underConstruction from '../../assets/images/under-construction.svg';

export default function JobRoadMap() {
    return (
        <div className="roadmap">
            <div className="roadmap__image-container">
                <img src={underConstruction} alt="under construction" className="roadmap__image"/>
                <div className="roadmap__texts">
                    <h4 className="roadmap__title">Coming Soon!</h4>
                    <p className="roadmap__notification">The feature helps you tracking each step of application process.</p>
                </div>
            </div>
            
        </div>
    )
}
