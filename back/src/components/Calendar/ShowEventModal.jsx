import React from 'react';
import { Modal } from 'react-bootstrap';
import ky from "ky";

export default function ShowEventModal({ show, handleClose, event }) {
    // Fonction pour formater la date au format lisible
    const formatDate = (date) => {
        return new Date(date).toLocaleString();
    };

    async function deleteEvent(id) {

        return ky.delete(`http://localhost:3000/event/${id}`, {
            credentials: "include",
        }).then((response) => {
            if (response.status === 200) {
                handleClose();
            }
        });
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Détails de l'événement</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {event && (
                    <>
                        <p><strong>Titre:</strong> {event.title}</p>
                        <p><strong>Description:</strong> {event.description}</p>
                        <p><strong>Date de début:</strong> {formatDate(event.start)}</p>
                        <p><strong>Date de fin:</strong> {formatDate(event.end)}</p>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer className="d-flex justify-between">
                <button onClick={() => deleteEvent(event.id)} className="btn btn-danger">Supprimer</button>
                <button onClick={handleClose} className="btn btn-secondary">Fermer</button>
            </Modal.Footer>
        </Modal>
    );
}
