import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.scss';
import searchIcon from '../../assets/icons/search-24px.svg';
import uniqid from 'uniqid';

export default function Dashboard({user, signOut}) {
    const [jobList, setJobList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/jobs/${user.uid}`)
        .then(res => {
            setJobList(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }, [user.uid])


    return (
        <div className="dashboard">
            <div className="dashboard__header">
                <div className="dashboard__avatar-container">
                    <div className="dashboard__image-container">
                        <img src={user.photoURL} alt={`avatar of ${user.displayName}`} className="dashboard__user-avatar"/>
                    </div>
                    <button onClick={() => signOut()} className="dashboard__logout-button button-small">Log out</button>
                </div>
                <div className="dashboard__header-texts">
                    <div>
                        <p className="dashboard__header-text">Hello,</p>
                        <h4 className="dashboard__header-userName">{user.displayName}</h4>
                    </div>
                    <Link to='/add'><button className="dashboard__add-button button-medium">Add Job</button></Link>
                </div>
                
            </div>
            <div className="dashboard__search-bar">
              <img src={searchIcon} alt="Search Icon" className="dashboard__search-icon"/>
              <input 
                type="text" 
                name="search"
                placeholder="Search by company name" 
                className="dashboard__search-input"
              />
            </div>
            <div className="dashboard__job-applications">
                {jobList.length > 0 ? jobList.map(job =>    
                <div className="dashboard__job-application" key={uniqid()}>
                    <div className="dashboard__job-header">
                        <h5 className="dashboard__job-header-text">{job.position}</h5>
                    </div>
                    <div className="dashboard__job-body">
                        <div className="dashboard__job-info">
                            <p className="dashboard__job-date">{job.date}</p>
                            <h4 className="dashboard__job-company">{job.company}</h4>
                            <p className="dashboard__job-position">{job.city}, {job.state} {job.country}</p>
                        </div>
                        <div className="dashboard__job-actions">
                            <button className="dashboard__job-details button-small">Details</button>
                            <div className="dashboard__edit-delete">
                                <button className="dashboard__edit button-small">Edit</button>
                                <button className="dashboard__delete button-small">Del</button>
                            </div>
                        </div>
                    </div>
                </div>)
                : <h5 className="dashboard__default-error">You do not have any job application, please add one!</h5>}
             
            </div>

        
            
        </div>
    )
}
