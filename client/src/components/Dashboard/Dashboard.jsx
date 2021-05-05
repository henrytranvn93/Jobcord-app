import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Dashboard.scss';
import searchIcon from '../../assets/icons/search-24px.svg'

export default function Dashboard({user, signOut}) {
    const [jobList, setJobList] = useState([]);

    useEffect(() => {
        console.log(user.uid);
        axios.get(`http://localhost:8080/jobs/${user.uid}`)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])


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
                    <button className="dashboard__add-button button-medium">Add Job</button>
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
                <div className="dashboard__job-application">
                    <div className="dashboard__job-info">

                    </div>
                    <div className="dashboard__job-actions">
                        <button className="dashboard__job-details"></button>
                        <div className="dashboard__edit-delete">
                            <button className="dashboard__edit"></button>
                            <button className="dashboard__delete"></button>
                        </div>
                    </div>

                </div>
            </div>

        
            
        </div>
    )
}
