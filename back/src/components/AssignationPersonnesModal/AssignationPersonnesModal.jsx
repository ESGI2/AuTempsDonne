import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import ky from "ky";
import AssignInput from "./AssignInput.jsx";
import DeleteButton from "../Button/DeleteButton.jsx";
import CancelButton from "../Button/CancelButton.jsx";
const AssignationPersonnesModal = ({ show, handleClose, onAssign, eventId }) => {
    const [volunteer, setVolunteer] = useState([]);
    const [available, setAvailable] = useState([]);
    const [participate, setParticipate] = useState([]);
    const [occupied, setOccupied] = useState([]);


    useEffect(() => {
        async function fetchData() {
            const data = await getAvailablePersons(eventId);
            setVolunteer(data);

            const availablePersons = data.filter(person => person.occupied === false && person.participate === false);
            setAvailable(availablePersons);

            const occupiedPersons = data.filter(person => person.occupied === true);
            setOccupied(occupiedPersons);

            const participatingPersons = data.filter(person => person.participate === true);
            setParticipate(participatingPersons);
        }
        fetchData();
    }, [eventId]);


    async function getAvailablePersons(eventId) {
        try {
            const response = await ky.get(`http://localhost:3000/event/availableUser?idNewEvent=${eventId}`, {
                credentials: "include",
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erreur lors de la récupération des personnes disponibles:', error);
        }
    }


    async function assignPersonToEvent(personId, eventId) {
        try {
            await ky.post(`http://localhost:3000/eventListing`, {
                credentials: "include",
                json: {
                    id_event: eventId,
                    id_user: personId
                }
            });
        } catch (error) {
            console.error('Erreur lors de l\'assignation de la personne à l\'événement:', error);
            throw error;
        }
    }

    async function handleAddPersonToEvent(personId) {
        try {
            await assignPersonToEvent(personId, eventId);
            // Mise à jour de participate en ajoutant la personne
            setParticipate(prevParticipate => {
                const person = available.find(person => person.id === personId);
                return [...prevParticipate, person];
            });

            // Mise à jour de available en retirant la personne
            setAvailable(prevAvailable => {
                return prevAvailable.filter(person => person.id !== personId);
            });

        } catch (error) {
            console.error('Erreur lors de l\'assignation de la personne à l\'événement:', error);
        }
    }


    async function removeParticipant(personId) {
        try {
            await ky.delete(`http://localhost:3000/eventListing?id_user=${personId}&id_event=${eventId}`, {
                credentials: "include"
            });
            const person = participate.find(person => person.id === personId);
            setParticipate(participate.filter(person => person.id !== personId));
            setAvailable([...available, person]);
        } catch (error) {
            console.error('Erreur lors de la suppression de la personne de l\'événement:', error);
        }
    }



    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Assigner des personnes à l'événement</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AssignInput volunteer={available} onAdd={handleAddPersonToEvent} />
                <div className="participate">
                    <ul className="list-group">
                        {participate.map(person => (
                            person && person.id && (
                                <li key={person.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {person.first_name} {person.last_name}
                                    <DeleteButton onClick={() => removeParticipant(person.id)}>X</DeleteButton>
                                </li>
                            )
                        ))}
                    </ul>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <CancelButton onClick={handleClose}>Fermer</CancelButton>
            </Modal.Footer>
        </Modal>
    );
};

export default AssignationPersonnesModal;
