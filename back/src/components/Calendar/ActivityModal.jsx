import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import ky from 'ky';

export default function ActivityModal({ show, handleClose }) {
    const [error, setError] = useState(null);
    const [activities, setActivities] = useState([]);
    const [newActivityName, setNewActivityName] = useState('');
    const [newActivityDescription, setNewActivityDescription] = useState('');
    const [newActivityPeopleNeeded, setNewActivityPeopleNeeded] = useState(1);
    const [showNewActivityModal, setShowNewActivityModal] = useState(false);

    useEffect(() => {
        fetchActivities();
    }, []);

    async function fetchActivities() {
        try {
            const response = await ky.get('http://localhost:3000/activity', {
                credentials: 'include'
            });
            const data = await response.json();
            setActivities(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des activités:', error);
        }
    }

    const handleAddActivity = async () => {

        if (!newActivityName || !newActivityDescription || !newActivityPeopleNeeded) {
            setError('Veuillez remplir tous les champs.');
            return;
        }
            try {
                const response = await ky.post('http://localhost:3000/activity', {
                    credentials: 'include',
                    json: {
                        activity_name: newActivityName,
                        description: newActivityDescription,
                        people_needed: newActivityPeopleNeeded
                    }
                });
                const newActivity = await response.json();
                setActivities([...activities, newActivity]);
                setNewActivityName('');
                setNewActivityDescription('');
                setNewActivityPeopleNeeded(1);
                setShowNewActivityModal(false);
            } catch (error) {
                console.error('Erreur lors de l\'ajout de l\'activité:', error);
            }
        }
        ;

        const handleDeleteActivity = async (id) => {
            try {
                await ky.delete(`http://localhost:3000/activity/${id}`, {
                    credentials: 'include'
                });
                setActivities(activities.filter(activity => activity.id !== id));
            } catch (error) {
                console.error('Erreur lors de la suppression de l\'activité:', error);
            }
        };

        return (
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Activités</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul>
                            {activities.map(activity => (
                                <li key={activity.id}>
                                    <strong>{activity.activity_name}</strong><br/>
                                    <span>Description: {activity.description}</span><br/>
                                    <span>Personnes nécessaires: {activity.people_needed}</span><br/>
                                    <button onClick={() => handleDeleteActivity(activity.id)}>Supprimer</button>
                                </li>
                            ))}
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={() => setShowNewActivityModal(true)} className="btn btn-primary">Nouvelle
                            activité
                        </button>
                        <button onClick={handleClose} className="btn btn-secondary">Fermer</button>
                    </Modal.Footer>
                </Modal>

                {/* Modal for adding new activity */}
                <Modal show={showNewActivityModal} onHide={() => setShowNewActivityModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nouvelle activité</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <Form.Group>
                            <Form.Label>Nom de l'activité:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nom de l'activité"
                                value={newActivityName}
                                onChange={e => setNewActivityName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Description de l'activité"
                                value={newActivityDescription}
                                onChange={e => setNewActivityDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Nombre de personnes nécessaires:</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                value={newActivityPeopleNeeded}
                                onChange={e => setNewActivityPeopleNeeded(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={handleAddActivity} className="btn btn-primary">Ajouter</button>
                        <button onClick={() => setShowNewActivityModal(false)} className="btn btn-secondary">Annuler
                        </button>
                    </Modal.Footer>
                </Modal>
            </>
        );
}