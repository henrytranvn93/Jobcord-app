import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.scss';
import searchIcon from '../../assets/icons/search-24px.svg';
import kidsOnSkate from '../../assets/images/cool-kid-on-skate.svg';
import { Modal, Button} from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';

export default function Dashboard({user, signOut, docID, setDocID}) {
    const [jobList, setJobList] = useState([]);
    const [show, setShow] = useState(false);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/jobs/${user.uid}`)
        .then(res => {
            setJobList(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [user.uid]);

    const handleDelete = (docID) => {
        axios.delete(`http://localhost:8080/jobs/${user.uid}/${docID}`)
        .then(res => {
            const newJobList = jobList.filter(job => job.docID !== docID);
            setJobList(newJobList);
            console.log(res.data);
            setShow(false);
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleChange = (e) => {
        setFilter(e.target.value)
    }
    
    const handleClose = () => setShow(false);
    const handleShow = (docid) => {
        setShow(true);
        setDocID(docid);
    };

    const jobListFilted = filter !== '' ? jobList.filter((job) => {
        return job.company.toLowerCase().includes(filter.toLowerCase()) || job.position.toLowerCase().includes(filter.toLowerCase());
    }) : jobList


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
                value={filter}
                onChange={handleChange}
                placeholder="Search by company name or position" 
                className="dashboard__search-input"
              />
            </div>
            {jobList.length > 1 && <p className="dashboard__job-total">{`${jobListFilted.length} Jobs`}</p>}
            <div className="dashboard__job-applications">
                {jobList.length > 0 ? jobListFilted.map(job =>    
                <div className="dashboard__job-application" key={job.id}>
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
                            <Link to='/details'>
                                <button onClick={() => setDocID(job.docID)} className="dashboard__job-details button-small">
                                    Details
                                </button>
                            </Link>
                            <div className="dashboard__edit-delete">
                                <button onClick={() => handleShow(job.docID)} className="dashboard__delete button-small">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>)
                : <div className="dashboard__no-jobs">
                    <img src={kidsOnSkate} alt="Cool Kid on wheels" className="dashboard__no-job-image" />
                    <h4 className="dashboard__no-job-title">No Job Found !</h4>
                    <p className="dashboard__no-job-text">You do not have any job application, please add one!</p>
                </div>}
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deleted job cannot be recovered !</Modal.Body>
                <Modal.Footer>
                    <Button className="modal__button-secondary" variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button className="modal__button-primary" variant="primary" onClick={() => handleDelete(docID)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <NavBar />   
        </div>
    )
}
