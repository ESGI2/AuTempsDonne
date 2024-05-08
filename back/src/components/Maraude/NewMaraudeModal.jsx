import React, { useState, useEffect } from 'react';
import { Modal, Form, Alert } from 'react-bootstrap';
import CancelButton from "../Button/CancelButton.jsx";
import ClassicButton from "../Button/ClassicButton.jsx";
import ky from 'ky';
import DeleteButton from "../Button/DeleteButton.jsx";

const NewMaraudeModal = ({ closeModal }) => {
    const [error, setError] = useState(null);
    const [show, setShow] = useState(true);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date_start: '',
        date_end: '',
        road_start: null,
        road_end: null,
    });
    const [inter, setInter] = useState([]);
    const [points, setPoints] = useState([]);

    const handleClose = () => {
        setShow(false);
        closeModal(step);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async () => {
        try {
            await ky.post('http://localhost:3000/maraude', {
                json: {
                    title: formData.name,
                    description: formData.description,
                    date_start: formData.date_start,
                    date_end: formData.date_end,
                    road_start: formData.road_start,
                    road_end: formData.road_end,
                    road_inter: inter.join(','),
                    product: "1:5",
                    truck: 1
                },
                credentials: 'include'
            }).json();
        } catch (error) {
            setError(error.message);
        }
    }

    const handleNextStep = () => {
        if (step === 1) {
            if (validateForm()) {
                setStep(2);
            }
        }
        if (step === 2) {
            handleSubmit().then(() => {
                console.log('Maraude créée');
            });
        }
    }

    const validateForm = () => {
        const { name, description, date_start, date_end, road_start, road_end, inter } = formData;
        if (step === 1 && (name === '' || description === '' || date_start === '' || date_end === '')) {
            setError('Veuillez remplir tous les champs');
            return false;
        } else if (step === 2 && (road_start === null || road_end === null || selectedPoints.length === 0)) {
            setError('Veuillez sélectionner un point de départ, un point d\'arrivée et au moins un point intermédiaire');
            return false;
        }
        return true;
    }

    const fetchPoints = async () => {
        try {
            const data = await ky.get('http://localhost:3000/maraudePoint', {
                credentials: 'include'
            }).json();
            setPoints(data);
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchPoints();
    }, []);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nouvelle maraude - Étape {step}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {step === 1 && (
                            <>
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
                                        name="date_start"
                                        value={formData.date_start}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formEndDate">
                                    <Form.Label>Date de fin</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name="date_end"
                                        value={formData.date_end}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <Form.Group controlId="formStart">
                                    <Form.Label>Point de départ</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="road_start"
                                        value={formData.road_start}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Sélectionnez un point de départ</option>
                                        {points.map(point => (
                                            <option key={point.id} value={point.id}>{point.name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formEnd">
                                    <Form.Label>Point arrivée</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="road_end"
                                        value={formData.road_end}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Sélectionnez un point arrivée</option>
                                        {points.map(point => (
                                            <option key={point.id} value={point.id}>{point.name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formInter">
                                    <Form.Label>Points intermédiaires</Form.Label>
                                {/*    Liste de checkbox avec chaque points (affichage : nom du point)*/}
                                {/*    Quand un point est coché, rajoute le point dans le state inter*/}
                                {/*    Quand un point est déchocher, le retire*/}

                                    {points.map(point => (
                                        <Form.Check
                                            key={point.id}
                                            type="checkbox"
                                            label={point.name}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setInter([...inter, point.id]);
                                                } else {
                                                    setInter(inter.filter(id => id !== point.id));
                                                }
                                            }}
                                        />
                                    ))}
                                </Form.Group>
                            </>
                        )}

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <ClassicButton onClick={handleNextStep}>{step === 2 ? 'Créer' : 'Suivant'}</ClassicButton>
                    <CancelButton onClick={handleClose}>Annuler</CancelButton>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NewMaraudeModal;
