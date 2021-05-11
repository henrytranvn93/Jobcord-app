import React from 'react';
import NavBar from '../NavBar/NavBar';
import './Statistics.scss';
import construction from '../../assets/images/under-construction.svg';

export default function Statistics() {
    return (
        <div className="statistics">
            <img src={construction} alt="under construction" className="statistics__image"/>
            <h5>Coming Soon!</h5>
            <p>Feature helps you tracking all statistics regarding your job application</p>
            <a href="https://huy-tran-portfolio-364e1.web.app/" target="_blank" rel="noopener noreferrer">Contact me for more information</a>
            <NavBar/>
            
        </div>
    )
}
