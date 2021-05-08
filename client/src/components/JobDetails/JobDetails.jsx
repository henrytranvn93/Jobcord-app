import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './JobDetails.scss';

import backIcon from '../../assets/icons/back-arrow.svg';
import axios from 'axios';

export default function JobDetails({user, docID}) {
    const [job, setJob] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/jobs/details/${user}/${docID}`)
        .then(res => {
            console.log(res.data);
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
                <h4 className="global__title">Details</h4>
            </div>
            <div className="jobDetails__heading">
                <h4 className="jobDetails__company">Google</h4>
            </div>
        </div>
    )
}
