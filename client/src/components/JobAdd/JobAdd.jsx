import React, {useState} from 'react';
import { Link, Redirect, Prompt } from 'react-router-dom';
import backIcon from '../../assets/icons/back-arrow.svg';
import './JobAdd.scss';
import {Form, Button, Col} from 'react-bootstrap';
import { convertDate } from '../../utils/utility';
import axios from 'axios';

export default function JobAdd({user, history}) {

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
      const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true); 

        if(form.checkValidity()) {
            event.preventDefault();
            let formTarget = event.target;
            axios.post(`http://localhost:8080/jobs/${user}`, {
                company: formTarget.company.value,
                date: convertDate(formTarget.date.value),
                position: formTarget.position.value,
                address: '',
                city: formTarget.city.value,
                state: formTarget.state.value,
                country: formTarget.country.value,
                jobDescription: formTarget.jobDescription.value,
                contactPhone: '',
                contactName: '',
                contactPosition: '',
                contactEmail: '',
                note: ''
            }).then(res => {
                console.log(res.data);
                history.push('/');  
            }).catch(err => console.log(err));
        }
    }


    return ( user === undefined ? <Redirect to="/"/> :
        <div className="jobAdd">
            <div className="global__header">
                <Link to="/">
                    <div className="global__back-button">
                        <img src={backIcon} alt="Back Icon" className="global__back-icon"/>
                    </div>
                </Link>
                <h4 className="global__title">Add Job Application</h4>
            </div>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="jobAdd__form">
                <Prompt message="Are you sure?" />
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="validationPosition">
                        <Form.Label>Position</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Position"
                            className="jobAdd__input"
                            name="position"
                        />
                        <Form.Control.Feedback>Nice!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid position.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCompany">
                        <Form.Label>Company</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Company"
                            className="jobAdd__input"
                            name="company"
                        />
                        <Form.Control.Feedback>Nice!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid company.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationDateApplied">
                        <Form.Label>Application Date</Form.Label>
                        <Form.Control 
                            type="date"
                            placeholder="Date of Birth" 
                            required
                            className="jobAdd__input"
                            name="date"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a date.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="validationCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="City" 
                            required
                            className="jobAdd__input"
                            name="city"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid city.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationState">
                        <Form.Label>State/Province</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="State/Province" 
                            required 
                            className="jobAdd__input"
                            name="state"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid state or province.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Country" 
                            required
                            className="jobAdd__input"
                            name="country"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Country.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="validationCountry">
                        <Form.Label>Job Description</Form.Label>
                        <Form.Control 
                            as="textarea"
                            placeholder="Job Description" 
                            required
                            className="jobAdd__input jobAdd__input-textarea"
                            name="jobDescription"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a job description.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <div className="jobAdd__buttons">
                    <Link to='/'><Button className="jobAdd__cancel-button button-small">Cancel</Button></Link>
                    <Button className="jobAdd__submit-button button-small" type="submit">Add</Button>
                </div>
            </Form>
        </div>
    )
}
