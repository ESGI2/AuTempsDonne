import React, { useState, useEffect } from 'react';
import {Modal, Form, Button, Alert} from 'react-bootstrap';
import ky from 'ky';

export default function PointDistributionModal({ show, handleClose }) {
    const [error, setError] = useState(null);
    const [points, setPoints] = useState([]);
    const [newPointName, setNewPointName] = useState('');
    const [newPointCountry, setNewPointCountry] = useState('');
    const [newPointCity, setNewPointCity] = useState('');
    const [newPointPostalCode, setNewPointPostalCode] = useState('');
    const [newPointRoad, setNewPointRoad] = useState('');
    const [showNewPointModal, setShowNewPointModal] = useState(false);

    useEffect(() => {
        fetchPoints();
    }, []);

    async function fetchPoints() {
        try {
            const response = await ky.get('http://localhost:3000/maraudePoint', {
                credentials: 'include'
            });
            const data = await response.json();
            setPoints(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des points de distribution:', error);
        }
    }

    const handleAddPoint = async () => {
        const data = {
            name: newPointName,
            country: newPointCountry,
            city: newPointCity,
            postal_code: newPointPostalCode,
            road: newPointRoad
        };

        if (data.name === '' || data.country === '' || data.city === '' || data.postal_code === '' || data.road === '') {
            setError('Veuillez remplir tous les champs');
            return;
        }
        try {
            const response = await ky.post('http://localhost:3000/maraudePoint', {
                credentials: 'include',
                json: data
            });
            await response.json();
            fetchPoints();
            setNewPointName('');
            setNewPointCountry('');
            setNewPointCity('');
            setNewPointPostalCode('');
            setNewPointRoad('');
            setShowNewPointModal(false);
        } catch (error) {
            console.error('Erreur lors de l\'ajout du point de distribution:', error);
        }
    };

    const handleDeletePoint = async (id) => {
        try {
            await ky.delete(`http://localhost:3000/maraudePoint/${id}`, {
                credentials: 'include'
            });
            setPoints(points.filter(point => point.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression du point de distribution:', error);
        }
    };

    const handleCloseNewPointModal = () => {
        setShowNewPointModal(false);
        fetchPoints();
    };

    return (
        <>
            <Modal show={show && !showNewPointModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Points de distribution</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {points.length === 0 && <Alert variant="info">Aucun point de distribution</Alert>}
                    <ul>
                        {points.map(point => (
                            <li key={point.id}>
                                <strong>{point.name}</strong><br />
                                <span>Pays: {point.country}</span><br />
                                <span>Ville: {point.city}</span><br />
                                <span>Code postal: {point.postal_code}</span><br />
                                <span>Adresse: {point.road}</span><br />
                                <Button variant="ml-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg" onClick={() => handleDeletePoint(point.id)}>Supprimer</Button>
                            </li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg" onClick={() => setShowNewPointModal(true)}>Nouveau point</Button>
                    <Button variant="ml-4 px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-lg" onClick={handleClose}>Fermer</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for adding new point */}
            <Modal show={showNewPointModal} onHide={handleCloseNewPointModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Nouveau point de distribution</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form>
                        <Form.Group controlId="formPointName">
                            <Form.Label>Nom du point:</Form.Label>
                            <Form.Control type="text" placeholder="Nom du point" value={newPointName} onChange={e => setNewPointName(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formPointCountry">
                            <Form.Label>Pays:</Form.Label>
                            <Form.Control type="text" placeholder="Pays" value={newPointCountry} onChange={e => setNewPointCountry(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formPointCity">
                            <Form.Label>Ville:</Form.Label>
                            <Form.Control type="text" placeholder="Ville" value={newPointCity} onChange={e => setNewPointCity(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formPointPostalCode">
                            <Form.Label>Code postal:</Form.Label>
                            <Form.Control type="text" placeholder="Code postal" value={newPointPostalCode} onChange={e => setNewPointPostalCode(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formPointRoad">
                            <Form.Label>Adresse:</Form.Label>
                            <Form.Control type="text" placeholder="Adresse" value={newPointRoad} onChange={e => setNewPointRoad(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg" onClick={handleAddPoint}>Ajouter</Button>
                    <Button variant="ml-4 px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-lg" onClick={handleCloseNewPointModal}>Annuler</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
