import React from 'react';
import './LoadingScreen.scss';
import logoLoading from '../../assets/icons/logo-jobcord-gif.gif';

export default function LoadingScreen() {
    return (
        <div className="loading-screen">
            <img src={logoLoading} alt="Jobcord Logo Loading Gif" className="loading-screen__image"/>
        </div>
    )
}
