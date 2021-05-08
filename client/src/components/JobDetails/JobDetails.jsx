import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './JobDetails.scss';
import JobInfo from './JobInfo';
import JobContact from './JobContact';
import JobResume from './JobResume';
import JobRoadMap from './JobRoadMap';

import backIcon from '../../assets/icons/back-arrow.svg';
import axios from 'axios';

export default function JobDetails({user, docID}) {
    const [job, setJob] = useState({});
    const [content, setContent] = useState('info');

    useEffect(() => {
        axios.get(`http://localhost:8080/jobs/details/${user}/${docID}`)
        .then(res => {
            setJob(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [user, docID])

    return ( docID === '' ? <Redirect to="/"/> :
        <div className="jobDetails">
            <div className="global__header">
                <Link to="/">
                    <div className="global__back-button">
                        <img src={backIcon} alt="Back Icon" className="global__back-icon"/>
                    </div>
                </Link>
                <h4 className="global__title jobDetails__title">Job Details</h4>
            </div>
            <div className="jobDetails__heading">
                <h4 className="jobDetails__company">Google</h4>
                <p className="jobDetails__position">Software Engineer</p>
                <div className="jobDetails__navigation">
                    <div 
                        id="info"
                        onClick={(e) => setContent(e.target.id)} 
                        className={`jobDetails__description-title jobDetails__navigate-box ${content === 'info' && 'box-active'}`}
                    >
                            Info
                    </div>
                    <div 
                        id="contact"
                        onClick={(e) => setContent(e.target.id)} 
                        className={`jobDetails__contact-title jobDetails__navigate-box ${content === 'contact' && 'box-active'}`}
                    >
                            Contact
                    </div>
                    <div 
                        id="roadmap"
                        onClick={(e) => setContent(e.target.id)} 
                        className={`jobDetails__roadmap-title jobDetails__navigate-box ${content === 'roadmap' && 'box-active'}`}
                    >
                            Steps
                    </div>
                    <div 
                        id="resume"
                        onClick={(e) => setContent(e.target.id)} 
                        className={`jobDetails__resume-title jobDetails__navigate-box ${content === 'resume' && 'box-active'}`}
                    >
                            Resume
                    </div>
                </div>
            </div>
            <div className="jobDetails__content">
                {content === 'info' && <JobInfo job={job} />}
                {content === 'contact' && <JobContact job={job} />}
                {content === 'roadmap' && <JobRoadMap />}
                {content === 'resume' && <JobResume job={job} />}
            </div>
        </div>
    )
}
