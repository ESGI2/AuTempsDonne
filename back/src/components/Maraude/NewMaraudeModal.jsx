import React, { useState } from 'react';
import {Button, Modal, Form, Alert} from 'react-bootstrap';
import CancelButton from "../Button/CancelButton.jsx";
import ClassicButton from "../Button/ClassicButton.jsx";
import MaraudePath from './MaraudePath';

const NewMaraudeModal = ({ closeModal }) => {
    const [error, setError] = useState(null);
    const [show, setShow] = useState(true);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: ''
    });

    const handleClose = () => {
        setShow(false);
        closeModal(step);
    }

    const handleModalClose = (step) => {
        setStep(step);
    }


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle form submission
        // You can access form data using formData
        if (step === 1) {
            // Move to next step if first form is submitted
            setStep(step + 1);
        }
    }

    const handleFinish = () => {
        handleClose();
    }

    const handleNextStep = () => {
        if (!validateForm()) return;
        else setStep(step + 1);
    }

    const validateForm = () => {
        if (formData.name === '' || formData.description === '' || formData.startDate === '' || formData.endDate === '') {
            setError('Veuillez remplir tous les champs');
            return true; // TODO Mettre sur false
        }
        return true;
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nouvelle maraude - Étape {step}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {step === 1 && (
                        <Form onSubmit={handleSubmit}>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form.Group controlId="formName">
                                <Form.Label>Nom</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Entrez le nom"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Entrez la description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formStartDate">
                                <Form.Label>Date de début</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formEndDate">
                                <Form.Label>Date de fin</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <ClassicButton onClick={handleNextStep}>Suivant</ClassicButton>
                        </Form>
                    )}
                    {step === 2 && <MaraudePath closeModal={handleModalClose} finish={handleFinish} />}
                </Modal.Body>
                <Modal.Footer>
                    <CancelButton onClick={handleClose}>Annuler</CancelButton>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NewMaraudeModal;
