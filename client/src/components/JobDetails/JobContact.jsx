import React, { useState } from 'react';
import contact from '../../assets/images/contact.svg';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import 'react-phone-number-input/style.css';


export default function JobContact({job, user, docID, history, setUpdate}) {
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
                axios.put(`http://localhost:8080/jobs/contact/${user}/${docID}`, {
                    contactName: formTarget.contactName.value,
                    contactEmail: formTarget.contactEmail.value,
                    contactPosition: formTarget.contactPosition.value,
                    contactPhone: formTarget.contactPhone.value,
                    address: formTarget.address.value,
                    city: formTarget.city.value,
                    state: formTarget.state.value,
                    country: formTarget.country.value
                }).then(res => {
                    console.log(res.data);
                    setShow(false);
                    setUpdate(true);
                    history.push('/details');
                }).catch(err => console.log(err))
        }
    }   
    return (
        <div className="jobContact">
             <div className="jobInfo__image-container">
                <img src={contact} alt="Girl with description" className="jobInfo__hero-image" />
            </div>
            <div className="jobContact__description">
                <div className="jobInfo__description-header">
                    <h5 className="jobInfo__title">Contact</h5>
                    <button onClick={() => handleShow()} className="jobInfo__edit button-small">Edit</button>
                </div>
                <div className="jobContact__body jobContact__contact-info">
                    <div className="jobContact__info">
                        <p className="jobContact__label">Name: </p>
                        <p className="jobContact__texts">{job.contactName}</p>
                    </div>
                    <div className="jobContact__info">
                        <p className="jobContact__label">Email: </p>
                        <p className="jobContact__texts">{job.contactEmail}</p>
                    </div>
                    <div className="jobContact__info">
                        <p className="jobContact__label">Phone: </p>
                        <p className="jobContact__texts">{job.contactPhone}</p>
                    </div>
                    <div className="jobContact__info">
                        <p className="jobContact__label">Position: </p>
                        <p className="jobContact__texts">{job.contactPosition}</p>
                    </div>
                    <div className="jobContact__info">
                        <p className="jobContact__label">Location:</p>
                        <p className="jobContact__texts">{`${job.address} ${job.city}, ${job.state} ${job.country}`}</p>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Contact Info</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit} noValidate validated={validated}>
                    <Modal.Body>
                        <Form.Group controlId="validationCompany">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Contact Name"
                                defaultValue={job.contactName}
                                className="jobAdd__input"
                                name="contactName"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationPosition">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Contact Email"
                                defaultValue={job.contactEmail}
                                className="jobAdd__input"
                                name="contactEmail"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid email.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationPosition">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Phone Number"
                                defaultValue={job.contactPhone}
                                className="jobAdd__input"
                                name="contactPhone"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid phone number.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationPosition">
                            <Form.Label>Position</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Contact Position"
                                defaultValue={job.contactPosition}
                                className="jobAdd__input"
                                name="contactPosition"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid position.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationPosition">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Work place address"
                                defaultValue={job.address}
                                className="jobAdd__input"
                                name="address"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid address.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationPosition">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="City"
                                defaultValue={job.city}
                                className="jobAdd__input"
                                name="city"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid city.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationPosition">
                            <Form.Label>State/Province</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="State or Province"
                                defaultValue={job.state}
                                className="jobAdd__input"
                                name="state"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid position.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationPosition">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Country"
                                defaultValue={job.country}
                                className="jobAdd__input"
                                name="country"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid position.
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
