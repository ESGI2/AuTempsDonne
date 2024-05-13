// MaraudePath.jsx
import React, { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import CancelButton from "../Button/CancelButton.jsx";
import ClassicButton from "../Button/ClassicButton.jsx";
import ky from 'ky';
import DeleteButton from "../Button/DeleteButton.jsx";

const MaraudePath = ({ closeModal, data }) => {
    const [points, setPoints] = useState([]);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [selectedPoints, setSelectedPoints] = useState([]);
    const [availablePoints, setAvailablePoints] = useState([]);
    const [error, setError] = useState(null);
    const [path, setPath] = useState([]);
    const [form, setForm] = useState(data);

    useEffect(() => {
        fetchPoints();
    }, []);

    const fetchPoints = async () => {
        try {
            const data = await ky.get('http://autempsdonne.site:3000/maraudePoint', {
                credentials: 'include'
            }).json();
            setPoints(data);
            setAvailablePoints(data)
        } catch (error) {
            setError(error.message);
        }
    }

    const handleNextStep = () => {
        closeModal(3); // Passe à l'étape 3
    }

    const handleCancel = () => {
        closeModal(1); // Revenir au step 1
    }

    const handleAddPoint = () => {
        if (!path) return;
        console.log(path)
        const selectedPoint = points.find(point => point.id === parseInt(path));
        console.log(selectedPoint)
        setSelectedPoints([...selectedPoints, selectedPoint]);
        setAvailablePoints(availablePoints.filter(point => point.id !== parseInt(path)));
        console.log(selectedPoints)
        setPath('');
    }

    const handleRemovePoint = (pointId) => {
        setSelectedPoints(selectedPoints.filter(point => point.id !== pointId));
        // On remet le point disponible
        const point = points.find(point => point.id === pointId);
        setAvailablePoints([...availablePoints, point]);
    }


    const handleStart = (e) => {
        setStart(e.target.value);
        // On retire le point de départ des points disponibles
        setAvailablePoints(availablePoints.filter(point => point.id !== parseInt(e.target.value)));
    }

    const handleEnd = (e) => {
        setEnd(e.target.value);
        // On retire le point d'arrivée des points disponibles
        setAvailablePoints(availablePoints.filter(point => point.id !== parseInt(e.target.value)));
    }

    // Rendu
    return (
        <>
            <Modal show={true} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Nouvelle maraude - étape 2</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="start">
                            <Form.Label>Point de départ</Form.Label>
                            <Form.Control as="select" onChange={handleStart}>
                                <option value="">Sélectionnez un point de départ</option>
                                {points.map(point => (
                                    <option key={point.id} value={point.id}>{point.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="end">
                            <Form.Label>Point d'arrivée</Form.Label>
                            <Form.Control as="select" onChange={handleEnd}>
                                <option value="">Sélectionnez un point d'arrivée</option>
                                {points.map(point => (
                                    <option key={point.id} value={point.id}>{point.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="path">
                            <Form.Label>Points intermédiaires</Form.Label>
                            <div className="d-flex align-items-center">
                                <Form.Control as="select" value={path} onChange={(e) => setPath(e.target.value)}>
                                    <option value="">Sélectionnez un point intermédiaire</option>
                                    {availablePoints.map(point => (
                                        <option key={point.id} value={point.id}>{point.name}</option>
                                    ))}
                                </Form.Control>
                                <ClassicButton onClick={handleAddPoint}>Ajouter</ClassicButton>
                            </div>
                        </Form.Group>
                        <div>
                            <p>Points intermédiaires sélectionnés :</p>
                            <ul>
                                {selectedPoints.map(selectedPoint => (
                                    selectedPoint && selectedPoint.id && (
                                        <li key={selectedPoint.id}>
                                            {selectedPoint.name}
                                            <DeleteButton onClick={() => handleRemovePoint(selectedPoint.id)} />
                                        </li>
                                    )
                                ))}
                            </ul>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <ClassicButton onClick={handleNextStep}>Suivant</ClassicButton>
                    <CancelButton onClick={handleCancel}>Annuler</CancelButton>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default MaraudePath;
