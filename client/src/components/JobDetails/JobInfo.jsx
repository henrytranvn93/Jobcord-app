import React, { useState } from 'react';
import description from '../../assets/images/description.svg';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function JobInfo({job, user, docID, history, setUpdate}) {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                axios.put(`http://localhost:8080/jobs/info/${user}/${docID}`, {
                    company: formTarget.company.value,
                    position: formTarget.position.value,
                    jobDescription: formTarget.jobDescription.value
                }).then(res => {
                    console.log(res.data);
                    setShow(false);
                    setUpdate(true);
                    history.push('/details');
                }).catch(err => console.log(err))
        }
    }   

    return (
        <div className="jobInfo">
            <div className="jobInfo__image-container">
                <img src={description} alt="Girl with description" className="jobInfo__hero-image" />
            </div>
            <div className="jobInfo__description">
                <div className="jobInfo__description-header">
                    <h5 className="jobInfo__title">Job Description</h5>
                    <button onClick={() => handleShow()} className="jobInfo__edit button-small">Edit</button>
                </div>
                <p className="jobInfo__description-texts">{job.jobDescription}</p>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Job Info</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit} noValidate validated={validated}>
                    <Modal.Body>
                        <Form.Group controlId="validationCompany">
                            <Form.Label>Company</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Company"
                                defaultValue={job.company}
                                className="jobAdd__input"
                                name="company"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid company.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationPosition">
                            <Form.Label>Position</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Position"
                                defaultValue={job.position}
                                className="jobAdd__input"
                                name="position"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid position.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationCountry">
                            <Form.Label>Job Description</Form.Label>
                            <Form.Control 
                                as="textarea"
                                placeholder="Job Description" 
                                required
                                defaultValue={job.jobDescription}
                                className="jobAdd__input jobAdd__input-textarea"
                                name="jobDescription"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a job description.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="modal__button-secondary" variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button className="modal__button-primary" variant="primary" type="submit">
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}
