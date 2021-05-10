import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './JobDetails.scss';
import JobInfo from './JobInfo';
import JobContact from './JobContact';
import JobResume from './JobResume';
import JobRoadMap from './JobRoadMap';

import backIcon from '../../assets/icons/back-arrow.svg';
import axios from 'axios';

export default function JobDetails({user, docID, history}) {
    const [job, setJob] = useState({});
    const [content, setContent] = useState('info');
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        if(user !== undefined){
        axios.get(`http://localhost:8080/jobs/details/${user}/${docID}`)
        .then(res => {
            setJob(res.data);
            setUpdate(false);
        })
        .catch(err => {
            console.log(err);
        })}
    }, [user, docID, update]);

    return ( docID === '' ? <h2>Loading...</h2> :
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
                <h4 className="jobDetails__company">{job.company}</h4>
                <p className="jobDetails__position">{job.position}</p>
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
                {content === 'info' && <JobInfo user={user} docID={docID} job={job} history={history} setUpdate={setUpdate} />}
                {content === 'contact' && <JobContact user={user} docID={docID} job={job} history={history} setUpdate={setUpdate}/>}
                {content === 'roadmap' && <JobRoadMap />}
                {content === 'resume' && <JobResume user={user} docID={docID} job={job} history={history} setUpdate={setUpdate}/>}
            </div>
        </div>
    )
}
