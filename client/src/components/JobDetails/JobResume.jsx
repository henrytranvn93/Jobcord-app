import axios from 'axios';
import React, { useState } from 'react';
import resume from '../../assets/images/resume.svg';
import {storage} from '../LoginPage/LoginPage';

export default function JobResume({user, docID, job, history, setUpdate}) {
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('No resume selected');

    const handleChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const upload = storage.ref(`resumes/${file.name}`).put(file);
        upload.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                storage.ref("resumes")
                .child(file.name)
                .getDownloadURL()
                .then(url => {
                    axios.post(`http://localhost:8080/jobs/upload/${user}/${docID}`, {resumeName: file.name, resumeURL: url})
                    .then(res => {
                        console.log(res.data);
                        setUpdate(true);
                        history.push('/details');
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => {
                    console.log(err);
                })
            }
        )
    }

    return (
        <div className="jobResume">
            <div className="jobResume__image-container">
                <img src={resume} alt="Girl watering plant" className="jobResume__image"/>
            </div>
            {job.resumeName && <div className="jobResume__current-resume">
                    <p className="jobResume__current-resume-text">Current Resume</p>
                    <a className="jobResume__current-link" href={`${job.resumeURL}`}>{job.resumeName}</a>
                    </div>}
            <form className="jobResume__form" onSubmit={handleSubmit}>
                <input 
                    type="file" 
                    id="file" 
                    className="jobResume__upload" 
                    onChange={handleChange}
                    accept="application/pdf, image/*" />
                <label id="upload-label" htmlFor="file">Choose your resume</label>
                <p className="jobResume__file-name">{fileName}</p>
                <button className="jobResume__form-submit" type="submit">Upload</button>
            </form>
        </div>
    )
}
