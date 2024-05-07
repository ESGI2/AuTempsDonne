import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import CancelButton from "../Button/CancelButton.jsx";
import ClassicButton from "../Button/ClassicButton.jsx";
import ky from 'ky';

const MaraudePath = ({ closeModal, finish }) => {
    // State
    const [points, setPoints] = useState([]);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [selectedPoints, setSelectedPoints] = useState([]);
    const [error, setError] = useState(null);
    const [path, setPath] = useState([]);

    useEffect(() => {
        fetchPoints();
    }, []);

    // Méthodes

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

    const handleFinish = () => {
        finish();
    }

    const handleCancel = () => {
        closeModal(1); // Revenir au step 1
    }

    const handleAddPoint = () => {
        if (!path) return;
        setSelectedPoints([...selectedPoints, path]);
        setPath('');
    }

    const handleRemovePoint = (pointId) => {
        setSelectedPoints(selectedPoints.filter(id => id !== pointId));
    }

    // Rendu
    return (
        <>
            <Modal show={true} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Nouvelle maraude - étape 2</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="start">Point de départ</label>
                        <select className="form-control" id="start" name="start" onChange={(e) => setStart(e.target.value)}>
                            <option value="">Sélectionnez un point de départ</option>
                            {points.map(point => (
                                <option key={point.id} value={point.id}>{point.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="end">Point d'arrivée</label>
                        <select className="form-control" id="end" name="end" onChange={(e) => setEnd(e.target.value)}>
                            <option value="">Sélectionnez un point d'arrivée</option>
                            {points.map(point => (
                                <option key={point.id} value={point.id}>{point.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="path">Points intermédiaires</label>
                        <div className="d-flex align-items-center">
                            <select className="form-control flex-grow-1" id="path" name="path" value={path} onChange={(e) => setPath(e.target.value)}>
                                <option value="">Sélectionnez un point intermédiaire</option>
                                {points.map(point => (
                                    <option key={point.id} value={point.id}>{point.name}</option>
                                ))}
                            </select>
                            <button className="btn btn-primary ms-2" onClick={handleAddPoint}>Ajouter</button>
                        </div>
                    </div>
                    <div>
                        <p>Points intermédiaires sélectionnés :</p>
                        <ul>
                            {selectedPoints.map(pointId => (
                                <li key={pointId}>
                                    {points.find(point => point.id === pointId)?.name}
                                    <button className="btn btn-danger ms-2" onClick={() => handleRemovePoint(pointId)}>Supprimer</button>
                                    <p>{points.name}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <ClassicButton onClick={handleFinish}>Terminer</ClassicButton>
                    <CancelButton onClick={handleCancel}>Annuler</CancelButton>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default MaraudePath;