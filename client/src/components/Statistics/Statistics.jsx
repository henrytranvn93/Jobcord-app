import React from 'react';
import NavBar from '../NavBar/NavBar';
import './Statistics.scss';
import construction from '../../assets/images/under-construction.svg';

export default function Statistics() {
    return (
        <div className="statistics">
            <img src={construction} alt="under construction" />
            <h5>Coming Soon!</h5>
            <p>Feature helps you tracking all statistics regarding your job application</p>
            <NavBar/>
            
        </div>
    )
}
