import React, { useEffect, useState } from 'react'
import { Modal, Form } from 'react-bootstrap'
import ky from "ky";

export default function NewEventModal({ show, handleClose }) {
    const [currentEvents, setCurrentEvents] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [activity, setActivity] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [allDay, setAllDay] = useState(false)

    const handleSubmit = async () => {
        try {
            console.log("allDay = " + allDay)
            await ky.post('http://localhost:3000/event', {
                credentials: "include",
                json: {
                    title,
                    description,
                    start,
                    end,
                    activity_id: activity,
                    allDay
                },
            });
            handleClose();
        } catch (error) {
            console.error('Erreur lors de la création de l\'événement:', error);
        }
    }

    async function getActivity() {
        try {
            const response = await ky.get('http://localhost:3000/activity', {
                credentials: "include"
            });
            const data = await response.json();
            return data; // Ajouter le retour de la valeur data
        } catch (error) {
            console.error('Erreur lors de la récupération des événements:', error);
        }
    }

    useEffect(() => {
        getActivity().then(data => setCurrentEvents(data));
    }, []);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Créer un événement</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="pb-3">
                        <Form.Label>Titre</Form.Label>
                        <Form.Control type="text" placeholder="Titre de l'événement" value={title} onChange={e => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="pb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type=" text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="pb-3">
                        <Form.Label>Activity</Form.Label>
                        <Form.Control as="select" onChange={e => setActivity(e.target.value)}>
                            <option value="">Choisir une activité</option>
                            {currentEvents.map((event) => (
                                <option key={event.id} value={event.id}>
                                    {event.activity_name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    {/* Check for allDay true false and change the date form from datetime to date only*/}
                    <Form.Group className="pb-3">
                        <Form.Check
                            type="checkbox"
                            label="Toute la journée"
                            checked={allDay}
                            onChange={e => setAllDay(e.target.checked)}
                        />
                    </Form.Group>

                    {allDay ? (
                        <>
                            <Form.Group className="pb-3">
                                <Form.Label>Date de début</Form.Label>
                                <Form.Control type="date" value={start} onChange={e => setStart(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="pb-3">
                                <Form.Label>Date de fin</Form.Label>
                                <Form.Control type="date" value={end} onChange={e => setEnd(e.target.value)} />
                            </Form.Group>
                        </>
                    ) : (
                        <>
                            <Form.Group className="pb-3">
                                <Form.Label>Date de début</Form.Label>
                                <Form.Control type="datetime-local" value={start} onChange={e => setStart(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="pb-3">
                                <Form.Label>Date de fin</Form.Label>
                                <Form.Control type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} />
                            </Form.Group>
                        </>
                    )}
                    {/*<Form.Group className="pb-3">*/}
                    {/*    <Form.Label>Date de début</Form.Label>*/}
                    {/*    <Form.Control type="datetime-local" value={start} onChange={e => setStart(e.target.value)} />*/}
                    {/*</Form.Group>*/}
                    {/*<Form.Group className="pb-3">*/}
                    {/*    <Form.Label>Date de fin</Form.Label>*/}
                    {/*    <Form.Control type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} />*/}
                    {/*</Form.Group>*/}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleClose} className="ml-4 px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-lg">
                    Annuler
                </button>
                <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                    Créer
                </button>
            </Modal.Footer>
        </Modal>
    )
}
